
import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://flyingtapfest.loddo.optimiseus.fr');

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