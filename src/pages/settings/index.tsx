import Layout from "@/components/Layout";
import { Tabs, Tab } from "@mui/material";
import { withProtected } from "@/hocs/withProtected";
import { useState } from "react";
import * as Styled from "@/styles/Settings.styled";

import CommonSettings from "@/components/CommonSettings";
import ChangePassSettings from "@/components/ChangePassSettings";

function Settings() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Layout>
      <>
        <Tabs
          value={activeTab}
          onChange={(_, activeTab) => setActiveTab(activeTab)}
        >
          <Tab label="Common" />
          <Tab label="Change password" />
        </Tabs>
        <Styled.Container>
          {activeTab === 0 ? <CommonSettings /> : <ChangePassSettings />}
        </Styled.Container>
      </>
    </Layout>
  );
}

export default withProtected(Settings);
