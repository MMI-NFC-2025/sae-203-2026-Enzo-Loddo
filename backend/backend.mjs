import PocketBase from 'pocketbase';

// Remplace l'URL par celle de ton serveur de test local pour l'instant
const pb = new PocketBase('http://127.0.0.1:8090');

// 1. Liste de tous les artistes triés par date de représentation
export async function getArtistesSortedByDate() {
    const records = await pb.collection('artiste').getFullList({
        sort: 'DateRepresentation',
    });
    return records;
}

// 2. Liste de toutes les scènes triées par nom
export async function getScenesSortedByName() {
    const records = await pb.collection('scene').getFullList({
        sort: 'nom',
    });
    return records;
}

// 3. Liste de tous les artistes triés par ordre alphabétique
export async function getArtistesSortedByName() {
    const records = await pb.collection('artiste').getFullList({
        sort: 'nom',
        expand: 'scene',
    });
    return records;
}

// 4. Infos d'un artiste en donnant son id en paramètre
export async function getArtisteById(id) {
    const record = await pb.collection('artiste').getOne(id, {
        expand: 'scene' // Permet de récupérer les infos de la scène liée
    });
    return record;
}

// 5. Infos d'une scène en donnant son id en paramètre
export async function getSceneById(id) {
    const record = await pb.collection('scene').getOne(id);
    return record;
}

// 6. Tous les artistes se produisant sur une scène donnée (par son id), triés par date
export async function getArtistesBySceneId(sceneId) {
    const records = await pb.collection('artiste').getFullList({
        filter: `scene = '${sceneId}'`,
        sort: 'DateRepresentation'
    });
    return records;
}

// 7. Tous les artistes se produisant sur une scène donnée (par son nom), triés par date
export async function getArtistesBySceneName(sceneName) {
    // On trouve d'abord la scène par son nom
    const scene = await pb.collection('scene').getFirstListItem(`nom = '${sceneName}'`);
    // Puis on cherche les artistes liés à cette scène
    const records = await pb.collection('artiste').getFullList({
        filter: `scene = '${scene.id}'`,
        sort: 'DateRepresentation'
    });
    return records;
}

// 8. Ajouter ou modifier les informations d'un artiste ou d'une scène
export async function addArtiste(data) {
    return await pb.collection('artiste').create(data);
}

export async function updateArtiste(id, data) {
    return await pb.collection('artiste').update(id, data);
}

export async function addScene(data) {
    return await pb.collection('scene').create(data);
}

export async function updateScene(id, data) {
    return await pb.collection('scene').update(id, data);
}