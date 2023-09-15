import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

export default function useFirestore() {
    let getCollection = (colName) => {

        let [error, setError] = useState('');
        let [loading, setLoading] = useState(false);
        let [data, setData] = useState([]);

        useEffect(function() {
            setLoading(true)
            let ref = collection(db,colName);
            let q = query(ref,orderBy('date','desc'));
            onSnapshot(q, docs => {
                if (docs.empty) {
                    setError('No Documents Found');
                    setLoading(false)
                } else {
                    let collectionDatas = [];
                    docs.forEach(doc => {
                        let document = {id : doc.id, ...doc.data()}
                        collectionDatas.push(document)
                    })
                    setData(collectionDatas);
                    setLoading(false)
                    setError('');
                }
            })
        },[])

        return {error,data,loading};
    }

    let getDocument = (colName,id) => {

        let [error, setError] = useState('');
        let [loading, setLoading] = useState(false);
        let [data, setData] = useState(null);

        useEffect(() => {
            setLoading(true)
            let ref = doc(db,colName,id);
            onSnapshot(ref, doc => {
                if (doc.exists()) {
                    let document = {id : doc.id, ...doc.data()};
                    setData(document);
                    setLoading(false)
                    setError('')
                } else {
                    setError('No Document Found')
                    setLoading(false)
                }
                
            })
        },[id])

        return {error,loading,data};
    }
    let addCollection = async (colName,data) => {
        data.date = serverTimestamp();
        let ref = collection(db,colName);
        return addDoc(ref,data)
    }

    let deleteDocument = async (colName,id) => {
        let ref = doc(db,colName,id);
        return deleteDoc(ref);
    }

    let updateDocument = async (colName,id,data) => {
        data.date = serverTimestamp();
        let ref = doc(db,colName,id)
        return updateDoc(ref,data);
    }

    return {getCollection,getDocument,addCollection,deleteDocument,updateDocument};
}
