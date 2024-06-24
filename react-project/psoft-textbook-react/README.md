# How to Run the Dafny Verifier:

1. `cd` into this folder (psoft-tools).
2. Run `npm install` to install all dependencies.
3. Run `npm run dev`, and open in your browser `http://localhost:5173`.
4. Run the backend (you must have Docker installed) by running Docker and running the command `docker run -p 80:80 eleanormally/dafny-server:latest`.
5. Type in your Dafny code, and click Verify Dafny to produce a result!
