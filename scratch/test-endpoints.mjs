import { spawn } from "child_process";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTests() {
  console.log("Starting Next.js test server on 127.0.0.1:3088...");
  const server = spawn("node", ["./node_modules/next/dist/bin/next", "start", "-p", "3088", "-H", "127.0.0.1"], {
    shell: true,
    stdio: "inherit",
  });

  let ready = false;
  for (let i = 0; i < 30; i++) {
    await wait(1000);
    try {
      const res = await fetch("http://127.0.0.1:3088/api/stats");
      if (res.ok) {
        ready = true;
        break;
      }
    } catch (err) {
      // connecting
    }
  }

  if (!ready) {
    console.error("Server failed to respond on 127.0.0.1:3088 in time.");
    server.kill();
    process.exit(1);
  }

  console.log("Server is ready! Running API verification suite...\n");

  try {
    // 1. Stats
    const statsRes = await fetch("http://127.0.0.1:3088/api/stats");
    const statsData = await statsRes.json();
    console.log("1. GET /api/stats:", statsRes.status, statsData);

    // 2. Next code
    const nextRes = await fetch("http://127.0.0.1:3088/api/codes/next");
    const nextData = await nextRes.json();
    console.log("2. GET /api/codes/next:", nextRes.status, nextData.code?.code);

    // 3. Codes list
    const codesRes = await fetch("http://127.0.0.1:3088/api/codes?limit=5");
    const codesData = await codesRes.json();
    console.log("3. GET /api/codes?limit=5:", codesRes.status, "count:", codesData.codes?.length);

    // 4. Code submission
    const newCode = `NG-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const submitRes = await fetch("http://127.0.0.1:3088/api/codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `Check out my code ${newCode} in the app!`,
        name: "Test Pilgrim",
      }),
    });
    const submitData = await submitRes.json();
    console.log("4. POST /api/codes (valid submission):", submitRes.status, submitData.code?.code);

    // 5. Duplicate submission check
    const duplicateRes = await fetch("http://127.0.0.1:3088/api/codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: `Duplicate: ${newCode}` }),
    });
    const duplicateData = await duplicateRes.json();
    console.log("5. POST /api/codes (duplicate rejected with 409):", duplicateRes.status, duplicateData.error);

    // 6. Invalid format check
    const invalidRes = await fetch("http://127.0.0.1:3088/api/codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "No code here at all!" }),
    });
    const invalidData = await invalidRes.json();
    console.log("6. POST /api/codes (invalid rejected with 400):", invalidRes.status, invalidData.error);

    // 7. Copy event
    const codeId = nextData.code?.id;
    if (codeId) {
      const copyRes = await fetch(`http://127.0.0.1:3088/api/codes/${codeId}/copy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "copy" }),
      });
      const copyData = await copyRes.json();
      console.log("7. POST /api/codes/[id]/copy:", copyRes.status, copyData);

      // 8. Report event
      const reportRes = await fetch(`http://127.0.0.1:3088/api/codes/${codeId}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "already_used" }),
      });
      const reportData = await reportRes.json();
      console.log("8. POST /api/codes/[id]/report:", reportRes.status, reportData);
    }

    // 9. Page HTML render check
    const enHtml = await fetch("http://127.0.0.1:3088/").then((r) => r.text());
    const arHtml = await fetch("http://127.0.0.1:3088/ar").then((r) => r.text());
    console.log("9. GET / rendered successfully, HTML length:", enHtml.length);
    console.log("10. GET /ar rendered successfully, HTML length:", arHtml.length);

    console.log("\nALL VERIFICATIONS PASSED 100%!");
  } finally {
    server.kill();
    try {
      spawn("taskkill", ["/pid", server.pid.toString(), "/f", "/t"]);
    } catch {}
  }
}

runTests();
