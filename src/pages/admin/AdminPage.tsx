import { ThinContainer } from "@/components/layout/ThinContainer";
import { Heading1, Paragraph } from "@/components/utils/Text";
import { SubPageLayout } from "@/pages/layouts/SubPageLayout";
import { ConfigValuesPart } from "@/pages/parts/admin/ConfigValuesPart";
import { ExtensionOverridePart } from "@/pages/parts/admin/ExtensionOverridePart";
import { M3U8TestPart } from "@/pages/parts/admin/M3U8TestPart";
import { RegionSelectorPart } from "@/pages/parts/admin/RegionSelectorPart";
import { TMDBTestPart } from "@/pages/parts/admin/TMDBTestPart";
import { WorkerTestPart } from "@/pages/parts/admin/WorkerTestPart";

import { BackendTestPart } from "../parts/admin/BackendTestPart";

export function AdminPage() {
  return (
    <SubPageLayout>
      <ThinContainer>
        <Heading1>Admin tools</Heading1>
        <Paragraph>Silly tools used test ZentraFlix! ૮₍´˶• . • ⑅ ₎ა</Paragraph>

        <ConfigValuesPart />
        <BackendTestPart />
        <WorkerTestPart />
        <TMDBTestPart />
        <M3U8TestPart />
        <ExtensionOverridePart />
        <RegionSelectorPart />
      </ThinContainer>
    </SubPageLayout>
  );
}
