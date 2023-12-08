import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { ContactPayload, Contacts } from "@capacitor-community/contacts";
import { useEffect, useState } from "react";
import { callOutline, personOutline } from "ionicons/icons";

const Tab1: React.FC = () => {
  const [contacts, setContacts] = useState<ContactPayload[]>([]);
  const getContacts = async () => {
    const projection = {
      name: true,
      phones: true,
      postalAddresses: true,
    };

    const result = await Contacts.getContacts({
      projection,
    });
    setContacts(result.contacts);
  };
  useEffect(() => {
    getContacts();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contacts List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Contacts List</IonTitle>
          </IonToolbar>
        </IonHeader>
        {contacts.map(({ name, phones }) => (
          <IonCard>
            <IonCardContent>
              <IonRow>
                <IonIcon icon={personOutline}></IonIcon>
                <IonText>
                  <p>{name?.display}</p>
                </IonText>
              </IonRow>
              <IonRow>
                <IonIcon icon={callOutline}></IonIcon>
                <IonText>
                  <p>{phones?.[0]?.number}</p>
                </IonText>
              </IonRow>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
