import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import React from 'react';


export default function UserLoading() {
    return (
      <div className="card">
        <div className="imgBox">
          <Skeleton baseColor="#2c3e50"       // dark base
  highlightColor="#34495e"  height={300} width={200} />
        </div>
        <div className="descriptionBox">
          <Skeleton baseColor="#2c3e50"       // dark base
  highlightColor="#34495e" height={20} width={180} style={{ marginTop: 10 }} />
          <Skeleton baseColor="#2c3e50"       // dark base
  highlightColor="#34495e" height={15} width={100} />
          <Skeleton baseColor="#2c3e50"       // dark base
  highlightColor="#34495e" height={50} width={200} />
        </div>
      </div>
    );
  }