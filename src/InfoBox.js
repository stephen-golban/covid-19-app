import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total, confirmed,death,recovered, ...props }) {
  return (
    <Card
      className={`infoBox infoBox--selected ${
        confirmed ? "infoBox--selected-confirmed" :
        recovered ? "infoBox--selected-recovered" :
        death && "infoBox--selected-dead"
      }`}
    >
      <CardContent>
          <i className={confirmed} id="confirmed-icon"></i>
          <i className={recovered} id="recovered-icon"></i>
          <i className={death} id="death-icon"></i>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${
        confirmed ? "infoBox-confirmed" :
        recovered ? "infoBox-recovered" :
        death && "infoBox-dead"
      }`}>
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;