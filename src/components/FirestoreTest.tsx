import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../firebase";

interface User {
  name: string;
  email: string;
}

const FirestoreTest: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const addTestUser = async () => {
      try {
        await addDoc(collection(db, "users"), {
          name: "John Doe",
          email: "johndoe@example.com"
        });
        console.log("Documento adicionado com sucesso!");
      } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
      }
    };

    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList: User[] = querySnapshot.docs.map(
        (doc: DocumentData) => doc.data() as User
      );
      setUsers(usersList);
    };

    addTestUser();
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Testando Firestore</h2>
      <ul>
        {users.map((user, index) =>
          <li key={index}>
            {user.name} - {user.email}
          </li>
        )}
      </ul>
    </div>
  );
};

export default FirestoreTest;
