import requests from './request';


const fetch = require('node-fetch');
export const keyApi =  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDY1MjZiNzVhM2MwZjM5Y2RkMGNiNDBmZWIyMjBlZSIsInN1YiI6IjY0MzM4ZGZiMzkxYjljMDBmNDViMTg3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lkDJoS1rvrxTr55D-h4qxLfboVGVMVPncXKNwlvqmkA"


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${keyApi}`
  }
};

export const getData = async(url)=>{
 return  await fetch(url, options)
  .then(res => res.json())
  .catch(err => console.error('error:' + err));
}

 
export const onGetData = async(typeListfilm)=>{
  const acc = {}
    await Object.values(requests).reduce(async(promise,docs)=>{
      await promise;
      await getData(base_url + docs[typeListfilm]).then((doc)=> {
        acc[docs.title] = doc.results;
    })
  }, Promise.resolve({}))
  return acc;
}


export const base_url = 'https://api.themoviedb.org/3'
export const image_url = "https://image.tmdb.org/t/p/original"

export const findGenerFilm = (generFilm)=>{
  const $ =  generFilm.map( gen=>{
  let $$
  Object.values(requests).forEach( doc => {
    if(doc.genner && (doc.genner.genner_movie=== gen
    ||doc.genner.genner_tv===gen
    )) $$ = doc.title.replace("_", " ") });
    return $$;
  })
  return $
}