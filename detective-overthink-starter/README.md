# Detective Overthink 🕵️

A beginner-friendly detective chatbot built with Next.js and the OpenAI API.

## Run on your computer
1. Install Node.js 20.9+.
2. Open this folder in VS Code, then use Terminal > New Terminal.
3. Run `npm install`.
4. Create `.env.local` next to `package.json` with `OPENAI_API_KEY=your_key_here`.
5. Run `npm run dev` and visit http://localhost:3000.

## Publish
1. Create a GitHub repository and publish this folder's contents (not an enclosing folder).
2. Import that repository into Vercel.
3. Under Environment Variables, add `OPENAI_API_KEY` with your secret value. Use Production (and Preview if needed).
4. Deploy. If you add the key after the first deployment, redeploy.

## Important
- `.env.local` is ignored by Git. Do not commit keys anywhere.
- Your API key incurs usage charges; put a budget in place.
- Before public release, add abuse prevention such as rate limiting and human verification. This starter limits prompt length/history but does not rate-limit requests.
- The model is configured as `gpt-4o-mini` in `app/api/chat/route.js`.
