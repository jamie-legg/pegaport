import { useLoaderData } from "@remix-run/react";
import { Link } from "remix";
import { getAssets, IAssets } from "~/pega";

export const loader = async () => {
  return getAssets();
};


export default function Index() {
  const assets = useLoaderData<IAssets>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Pega UI by MAD£</h1>
      Locked VIS: {assets.lockedVis}
      <ul>
        <li>
          <Link to="/pega">My Pega</Link>
        </li>
      </ul>
    </div>
  );
}
