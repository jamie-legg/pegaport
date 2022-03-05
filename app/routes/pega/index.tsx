import { Link, useLoaderData } from "remix";
import { getPega, IPega } from "~/pega";
import type { LoaderFunction } from "remix";
import { useMemo } from "react";
import { Score } from "~/components/score";
import Timer from "~/components/timer";
import Title from "~/components/title";
import Heading from "~/components/heading";

export const loader: LoaderFunction  = async () => {
  return getPega();
};

export default function Pega() {

  
  const pegas:IPega[] = useLoaderData<IPega[]>();
  pegas.sort((a, b) => b.winRate - a.winRate);
    return (
      <main>
        <Title>My Pega</Title>
        <Heading>tracking {pegas.length} pega </Heading>
        
      </main>
    );
  }