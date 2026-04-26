"use client";

import { useState, useEffect } from "react";
import { collection, query, onSnapshot, QueryConstraint } from "firebase/firestore";
import { db } from "../config";
// import { useAuth } from "../client-provider"; // Assuming there is an Auth Provider with isUserLoading

// Mocking useAuth for this example based on instructions
const useAuth = () => ({ isUserLoading: false, user: null });

export function useCollection<T>(path: string, ...queryConstraints: QueryConstraint[]) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { isUserLoading } = useAuth();

  useEffect(() => {
    // CRITICAL: Auth timing fix
    if (isUserLoading) return;
    
    if (!path) {
      setData(null);
      setLoading(false);
      return;
    }

    const ref = collection(db, path);
    const q = query(ref, ...queryConstraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(result);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Firestore error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path, isUserLoading, /* should memoize queryConstraints in real app */]);

  return { data, loading, error };
}
