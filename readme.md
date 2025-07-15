# Plant Hire Equipment Assistant

A chat-based assistant for exploring and managing plant hire equipment data.

## Prerequisites

Before you begin, ensure you have:

* **Node.js** (v14 or higher) and **npm** installed
* A **Snowflake** account and service user configured for key‑pair (JWT) authentication
* A **Groq** API key

## Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd <your-project-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create your environment file**

   * Rename `.env.example` (if available) to `.env.local`, or create a new file named `.env.local` in the project root.
   * Add your credentials and configuration:

     ```env
     # Snowflake (key‑pair authentication)
     SNOWFLAKE_ACCOUNT=your_account
     SNOWFLAKE_USER=service_user
     SNOWFLAKE_AUTHENTICATOR=SNOWFLAKE_JWT
     SNOWFLAKE_PRIVATE_KEY_PATH=/path/to/rsa_private_key.p8
     SNOWFLAKE_PRIVATE_KEY_PASSPHRASE=your_passphrase   # omit if unencrypted
     SNOWFLAKE_WAREHOUSE=RETRIEVAL
     SNOWFLAKE_DATABASE=TEST_DB
     SNOWFLAKE_SCHEMA=CORTEX
     SNOWFLAKE_ROLE=SYSADMIN

     # Groq API
     GROQ_API_KEY=your_groq_key

     # App settings
     DEFAULT_PROPERTY_ID=2
     NEXT_PUBLIC_APP_NAME="Plant Hire Equipment Assistant"
     ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

5. **Build for production** (optional)

   ```bash
   npm run build
   ```

6. **Deploy to Vercel**

   ```bash
   vercel
   ```

## Environment Variables Reference

| Variable                           | Description                                 | Required |
| ---------------------------------- | ------------------------------------------- | :------: |
| `SNOWFLAKE_ACCOUNT`                | Your Snowflake account identifier           |    Yes   |
| `SNOWFLAKE_USER`                   | Service username for Snowflake              |    Yes   |
| `SNOWFLAKE_AUTHENTICATOR`          | Should be `SNOWFLAKE_JWT` for key‑pair auth |    Yes   |
| `SNOWFLAKE_PRIVATE_KEY_PATH`       | Path to your RSA private key (`.p8` format) |    Yes   |
| `SNOWFLAKE_PRIVATE_KEY_PASSPHRASE` | Passphrase for encrypted key (omit if none) |    No    |
| `SNOWFLAKE_WAREHOUSE`              | Default warehouse (e.g. `RETRIEVAL`)        |    Yes   |
| `SNOWFLAKE_DATABASE`               | Default database name (e.g. `TEST_DB`)      |    Yes   |
| `SNOWFLAKE_SCHEMA`                 | Default schema (e.g. `CORTEX`)              |    Yes   |
| `SNOWFLAKE_ROLE`                   | Default role (e.g. `SYSADMIN`)              |    Yes   |
| `GROQ_API_KEY`                     | API key for Groq                            |    Yes   |
| `DEFAULT_PROPERTY_ID`              | Fixed property identifier (e.g. `2`)        |    Yes   |
| `NEXT_PUBLIC_APP_NAME`             | App name exposed to the browser             |    Yes   |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
