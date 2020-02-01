import React from "react";
import { Badge } from "antd";
import { Button } from "antd";
import styled from "styled-components";

const Menu = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 20px;
   margin: 2%;
`;

const Label = styled(Badge)`
   margin-right: 50px;
`;
const VisualizerHeader = props => {
   return (
      <Menu>
         <Button type="primary">Visualize</Button>
         <div>
            <Label color="#1de9b6" text="Start Node" />
            <Label color="#ff1744" text="End Node" />
            <Label color="#424242" text="Wall Node" />
         </div>
      </Menu>
   );
};

export default VisualizerHeader;
