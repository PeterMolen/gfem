import { useEffect, useState } from "react";

// The OAuth client ID from the integration page!
const oauth_client_id = "dc35dcf6-8926-44b4-8bdd-077d3489301c";

function LoginManager() {
  const [dbs, setdbs] = useState([]);

  // When you open the app, this doesn't do anything, but after you sign into Notion, you'll be redirected back with a code at which point we call our backend.
  useEffect(() => {
    const params = new URL(window.document.location).searchParams;
    const code = params.get("code");
    if (!code) return;
    fetch(`http://localhost:3000/login/${code}`).then(async (resp) => {
      setdbs(await resp.json());
    });
    console.log("Din token är: " + code);
  }, []);

  return (
    <div>
      <a
        style={{ display: "block" }}
        href={`https://api.notion.com/v1/oauth/authorize?client_id=${oauth_client_id}&response_type=code&owner=user`}
      >
        Connect to Notion
      </a>
      {dbs.map((db) => (
        <div
          style={{
            display: "inline-flex",
            whiteSpace: "pre",
            border: "1px solid black",
            marginBottom: 10,
          }}
        >
          {JSON.stringify(db, null, 2)}
        </div>
      ))}
    </div>
  );
}

export default LoginManager;