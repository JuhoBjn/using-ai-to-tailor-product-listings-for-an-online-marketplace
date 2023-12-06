# using-ai-to-tailor-product-listings-for-an-online-marketplace

A proof-of-concept marketplace using LLM and text-to-image models to tailor product listings for users.

## Dev

You will need an OpenAI API key if you want to use the AI features.
You can get one [here](https://platform.openai.com/api-keys).
If you don't want to use the AI features, you can skip this step and set the environment variable `PERSONALIZATION_DISABLED=true`, which will skip the AI calls and thus disable the personalization features. It is useful if you just want to run the see the ui.

Example .env files are provided in the `backend` and `frontend` directories.

```
cp .env.example .env
```

and fill in the values.

Generate placeholder images without AI:

```
cd backend/images
./generate_placeholder_imgs.sh
```

Generate product images with AI:

```
cd backend/images
node createImages.js
```

### Run the server

```
cd backend
npm install
npm run dev
```

### Run the client

```
cd frontend
npm install
npm run dev
```
