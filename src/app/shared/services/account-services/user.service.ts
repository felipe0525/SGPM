import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User, UserForm } from '../../../models/account/user';

const PATH = 'users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);

  getUsers() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<
      User[]
    >;
  }

  async getUser(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as User;
    } catch (error) {
      //catch error
      return undefined;
    }
  }

  async searchUserByQuery(name: string) {
    const q = query(
      this._collection,
      where('name', '>=', name),
      where('name', '<=', name + '\uf8ff'),
    );
    const querySnapshot = await getDocs(q);
    let users: User[] = [];
    querySnapshot.forEach((doc) => {
      users = [...users, { id: doc.id, ...doc.data() } as User];
    });
    return users;
  }

  async searchUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const q = query(
      this._collection,
      where('email', '==', email),
      where('password', '==', password)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() } as User;
    }
    return null;
  }

  createUser(user: UserForm) {
    return addDoc(this._collection, user);
  }

  updateUser(id: string, user: UserForm) {
    return updateDoc(this.document(id), { ...user });
  }

  deleteUser(id: string) {
    return deleteDoc(this.document(id));
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }

  constructor() { }
}
