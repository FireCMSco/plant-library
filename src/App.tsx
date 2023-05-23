import React from "react";

import {
  Authenticator, EntityCollection, EntityCollectionsBuilder,
  FirebaseCMSApp
} from "firecms";

import { useDataEnhancementPlugin } from "@firecms/data_enhancement";
import plantLogo from "./assets/book.png";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";
import {adminCollection, plantsCollection} from "./collections";

// TODO: Replace with your config
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

export default function App() {

  const customAuthenticator: Authenticator = ({ user,authController, dataSource }) => {
    if (user?.email?.includes("flanders")) {
      throw Error("Stupid Flanders!");
    }
    else if(user?.email) {
      dataSource.fetchEntity({
        path: "admins",
        entityId: user.email,
        collection: adminCollection
      }).then((entity) => {
        if(entity)
          authController.setExtra({
            roles: ["admin"]
          });
      })
    }
    return true;
  };

  const collectionsBuilder:EntityCollectionsBuilder = async ({ authController }) => {
    const collections: Array<EntityCollection> = [plantsCollection];
    if(authController.extra?.roles.includes("admin"))
      collections.push(adminCollection);
    return collections;
  };

  const dataEnhancementPlugin = useDataEnhancementPlugin({
    apiKey: "API_KEY
    getConfigForPath: ({path}) => path === "plants"
  });

  return <FirebaseCMSApp
    name={"Plant Library"}
    logo={plantLogo}
    allowSkipLogin={true}
    authentication={customAuthenticator}
    plugins={[dataEnhancementPlugin]}
    collections={collectionsBuilder}
    firebaseConfig={firebaseConfig}
  />;
}