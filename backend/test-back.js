import { getScenes } from './backend.mjs'; 

async function testerLesRequetes() {
    console.log("⏳ Test de la récupération des scènes...");
    const scenes = await getScenes();
    console.log("✅ Scènes récupérées :", scenes);
}

testerLesRequetes();