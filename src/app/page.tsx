'use client'

import { SideBySideRow, FullWidthRow, RowSeparator } from "@/components/notebook/layout/Rows";

import CatalogueCard from "@/components/notebook/CatalogueCard";
import RNCodeBlock from "@/components/notebook/typography/CodeBlock";
import RNContentBody from "@/components/notebook/ContentBody";
import RNParagraph from "@/components/notebook/typography/Paragraph";
import NarrowDeviceView from "@/components/notebook/NarrowDeviceView";

import { parseCode } from "@/lib/codeUtils";
import useNarrowDevice from "@/hooks/useNarrowDevice";

import React from "react";

export default function Home() {
  const isNarrowDevice = useNarrowDevice();

  if (isNarrowDevice) {
    return <NarrowDeviceView title="React Notebook" />;
  }

  return (
    <RNContentBody title="React Notebook">

      <SideBySideRow
        left={<>
          <RNParagraph>
            Welcome to my React Notebook :D
          </RNParagraph>
        </>}
        right={<RNCodeBlock codeString={parseCode(`
import React from "react";
`)} />}
      />

      <FullWidthRow>
        <RNParagraph>
          This page contains a practical collection of some fundamental concepts in React with TypeScript. Its original purpose was to help me prepare for my interview and serves as a reference for looking up those concepts. I wanted the page to look as minimal as possible to prevent distractions and aimed to create a reading experience that is both intuitive and interactive. Most importantly, the example code on each page corresponds exactly to the code within that page-which means what you see actually works.
        </RNParagraph>
      </FullWidthRow>

      <RowSeparator />

      <FullWidthRow>

        <RNParagraph>
          Here is a list of topics; some of them are currently disabled and are a work in progress.
        </RNParagraph>
      </FullWidthRow>

      <SideBySideRow
        left={
          <CatalogueCard
            name="State Management"
            description="Native ways of managing states."
            url="/state-management"
          />
        }
        right={
          <CatalogueCard
            name="Fetching Remote Data"
            description="Native ways of fetching remote data via REST and GraphQL."
            // url="fetching-remote-data"
            disabled={true}
          />
        }
      />

    </RNContentBody>
  );
}