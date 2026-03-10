// backend/backend.mjs
import PocketBase from 'pocketbase';

// ON AJOUTE "export" ICI POUR QUE ASTRO PUISSE LE VOIR
export const pb = new PocketBase('http://127.0.0.1:8090');

// Tes fonctions existantes (elles restent inchangées mais sont maintenant fonctionnelles)
export async function getArtistesSortedByDate() {
    return await pb.collection('artiste').getFullList({ sort: 'DateRepresentation' });
}

export async function getScenesSortedByName() {
    return await pb.collection('scene').getFullList({ sort: 'nom' });
}

export async function getArtistesSortedByName() {
    return await pb.collection('artiste').getFullList({ sort: 'nom', expand: 'scene' });
}

export async function getArtisteById(id) {
    return await pb.collection('artiste').getOne(id, { expand: 'scene' });
}

export async function getSceneById(id) {
    return await pb.collection('scene').getOne(id);
}