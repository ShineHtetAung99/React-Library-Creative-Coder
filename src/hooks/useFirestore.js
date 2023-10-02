import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase';

export default function useFirestore() {
    let getCollection = (colName,_q) => {

        let qRef = useRef(_q).current
        let [error, setError] = useState('');
        let [loading, setLoading] = useState(false);
        let [data, setData] = useState([]);

        useEffect(function() {
            setLoading(true)
            let ref = collection(db,colName);
            let qureires = [];
            if (qRef) {
                qureires.push(where(...qRef))
            }
            qureires.push(orderBy('date', 'desc'));
            let q = query(ref, ...qureires);
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
        },[qRef])

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

    let updateDocument = async (colName,id,data,updateDate = true) => {
        if (updateDate) {
            data.date = serverTimestamp();
        }
        let ref = doc(db,colName,id)
        return updateDoc(ref,data);
    }

    return {getCollection,getDocument,addCollection,deleteDocument,updateDocument};
}
