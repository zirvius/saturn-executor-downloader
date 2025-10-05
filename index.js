#!/usr/bin/env node

const readline = require('readline');

async function main() {
  function input(question) {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  const color = {
    reset: "\x1b[0m",
    cyan: "\x1b[36m",
    yellow: "\x1b[33m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    white: "\x1b[37m",
    bold: "\x1b[1m",
  };

  process.stdout.write('\x1Bc');

  process.stdout.write(`${color.cyan}Fetching data from Saturn API`);
  let dots = 0;
  const loading = setInterval(() => {
    process.stdout.write('.');
    dots++;
  }, 300);

  const data = await fetch("https://api.saturn.web.id/api/executor");
  const result = await data.json();
  clearInterval(loading);

  const json = result;

  process.stdout.write('\x1Bc');

  console.log(`${color.cyan}╔══════════════════════════════════════════════════╗`);
  console.log(`${color.cyan}║        🚀 ${color.bold}SATURN EXECUTOR DOWNLOADER${color.reset}${color.cyan}             ║`);
  console.log(`${color.cyan}╚══════════════════════════════════════════════════╝${color.reset}`);
  console.log(`${color.white}Choose the executor you want to download:\n`);

  const executors = [
    "Arceus X", "Codex", "Fluxus", "Hydrogen", "Delta",
    "Trigon", "Vegax", "Evon", "Alysee", "Valyse",
    "Cubix", "Cryptic", "Krnl"
  ];

  executors.forEach((name, i) => {
    console.log(`${color.yellow}${i + 1}. ${color.white}${name}`);
  });

  console.log(`\n${color.cyan}💡 How to choose:${color.white} Type the number of the executor you want.`);
  console.log(`${color.cyan}📄 Note:${color.white} Updated every one hour`);
  const teks = await input(`${color.green}👉 Choose a number: ${color.reset}`);

  exec(teks.trim());

  function exec(number) {
    const map = {
      1: "arceusx",
      2: "codex",
      3: "fluxus",
      4: "hydrogen",
      5: "delta",
      6: "trigon",
      7: "vegax",
      8: "evon",
      9: "alysee",
      10: "valyse",
      11: "cubix",
      12: "cryptic",
      13: "krnl"
    };

    const key = map[number];
    if (!key) {
      console.log(`${color.red}❌ Invalid selection!${color.reset}`);
      return;
    }

    const android = json[key]?.[0]?.android || "Not Found";
    const ios = json[key]?.[0]?.ios || "Not Found";

    console.log(`\n${color.cyan}╔══════════════════════════════════════╗`);
    console.log(`${color.cyan}║ ${color.bold}Executor:${color.white} ${executors[number - 1]}${color.reset}`);
    console.log(`${color.cyan}╠══════════════════════════════════════╣`);
    console.log(`${color.cyan}║ ${color.yellow}Android:${color.white} ${android}`);
    console.log(`${color.cyan}║ ${color.yellow}iOS:${color.white} ${ios}`);
    console.log(`${color.cyan}╚══════════════════════════════════════╝${color.reset}`);
  }
}

main();
