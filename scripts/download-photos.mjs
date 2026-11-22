import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetDir = path.resolve(__dirname, "../public/images");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const items = [
  // 1. Places (10)
  { id: "place-bhubaneswar", queries: ["Lingaraja Temple", "Bhubaneswar skyline", "Mukteshvara Temple"] },
  { id: "place-puri", queries: ["Jagannath Temple, Puri", "Puri beach", "Ratha Yatra"] },
  { id: "place-konark", queries: ["Konark Sun Temple", "Konark"] },
  { id: "place-cuttack", queries: ["Barabati fort", "Cuttack silver filigree", "Mahanadi River"] },
  { id: "place-chilika", queries: ["Chilika Lake", "Irrawaddy dolphin"] },
  { id: "place-sambalpur", queries: ["Hirakud Dam", "Sambalpur", "Sambalpuri saree"] },
  { id: "place-simlipal", queries: ["Simlipal National Park", "Barehipani Falls", "Mayurbhanj"] },
  { id: "place-koraput", queries: ["Deomali", "Duduma Falls", "Koraput"] },
  { id: "place-rourkela", queries: ["Hanuman Vatika", "Rourkela Steel Plant", "Rourkela"] },
  { id: "place-dhauli", queries: ["Dhauli", "Shanti Stupa Dhauli", "Ashoka rock edict Dhauli"] },

  // 2. Panorama
  { id: "panorama-chilika", queries: ["Chilika Lake sunset", "Chilika Lake", "Mangalajodi"] },

  // 3. Timeline (10 pairs = 20)
  { id: "timeline-ancient-1", queries: ["Kalinga (historical region)", "Sadhabas Kalinga", "Maritime history of Odisha"] },
  { id: "timeline-ancient-2", queries: ["Bali Jatra", "Boita Bandana", "Cuttack Bali Jatra"] },
  { id: "timeline-mauryan-1", queries: ["Kalinga War", "Ashoka the Great", "Maurya Empire"] },
  { id: "timeline-mauryan-2", queries: ["Dhauli", "Major Rock Edicts", "Ashoka Pillar"] },
  { id: "timeline-kharavela-1", queries: ["Kharavela", "Hathigumpha inscription", "Udayagiri and Khandagiri Caves"] },
  { id: "timeline-kharavela-2", queries: ["Rani Gumpha", "Udayagiri caves", "Khandagiri"] },
  { id: "timeline-classical-1", queries: ["Ratnagiri, Odisha", "Diamond Triangle Odisha", "Bhauma-Kara dynasty"] },
  { id: "timeline-classical-2", queries: ["Lalitgiri", "Udayagiri, Odisha", "Buddhist art in Odisha"] },
  { id: "timeline-temple-1", queries: ["Mukteshvara Temple, Bhubaneswar", "Somavamshi dynasty"] },
  { id: "timeline-temple-2", queries: ["Rajarani Temple", "Lingaraj Temple", "Brahmeswara Temple"] },
  { id: "timeline-ganga-1", queries: ["Narasimhadeva I", "Eastern Ganga dynasty"] },
  { id: "timeline-ganga-2", queries: ["Konark Sun Temple wheels", "Konark Sun Temple", "Konark"] },
  { id: "timeline-gajapati-1", queries: ["Gajapati Kingdom", "Kapilendra Deva", "Chhera Pahanra"] },
  { id: "timeline-gajapati-2", queries: ["Puri Jagannath temple", "Prataparudra Deva"] },
  { id: "timeline-medieval-1", queries: ["Mukunda Deva", "Barabati Fort", "Mughal Empire"] },
  { id: "timeline-medieval-2", queries: ["Puri temple history", "Puri Rath Yatra"] },
  { id: "timeline-colonial-1", queries: ["Paika Rebellion", "Bakshi Jagabandhu", "Khurda fort"] },
  { id: "timeline-colonial-2", queries: ["Madhusudan Das", "Utkal Sammilani", "Gopabandhu Das"] },
  { id: "timeline-modern-1", queries: ["Hirakud Dam", "Mahanadi River", "Bhubaneswar smart city"] },
  { id: "timeline-modern-2", queries: ["Birsa Munda International Hockey Stadium", "Kalinga Stadium", "Bhubaneswar airport"] },

  // 4. Culture (8)
  { id: "culture-odissi", queries: ["Odissi", "Sujata Mohapatra", "Kelucharan Mohapatra"] },
  { id: "culture-pattachitra", queries: ["Pattachitra", "Raghurajpur", "Tala pattachitra"] },
  { id: "culture-sambalpuri", queries: ["Sambalpuri sari", "Ikat", "Pasapali sari"] },
  { id: "culture-rathyatra", queries: ["Ratha Yatra (Puri)", "Ratha Yatra", "Nandighosha"] },
  { id: "culture-chhau", queries: ["Chhau dance", "Mayurbhanj Chhau", "Seraikella Chhau"] },
  { id: "culture-cuisine", queries: ["Chhena poda", "Rasagola", "Dalma (dish)", "Pakhala"] },
  { id: "culture-tribal", queries: ["Dongria Kondh", "Santhal people", "Bonda people", "Saura art"] },
  { id: "culture-festivals", queries: ["Raja (festival)", "Nuakhai", "Durga Puja Cuttack", "Dola Yatra"] },

  // 5. Jagannath Shree Mandir & Aarti (1 + 8)
  { id: "hero-jagannath", queries: ["Jagannath Temple, Puri", "Jagannath"] },
  { id: "aarti-mangala", queries: ["Aarti", "Diya (lamp)", "Mangala aarti"] },
  { id: "aarti-mailam", queries: ["Jagannath deity garments", "Balarama Mural", "Pattachitra"] },
  { id: "aarti-abakash", queries: ["Snana Yatra", "Puja (Hinduism)", "Holy water Hindu"] },
  { id: "aarti-sakala", queries: ["Dhupa", "Incense offering Hindu", "Aarti lamps"] },
  { id: "aarti-madhyahna", queries: ["Mahaprasad", "Chappan Bhog", "Temple bhoga"] },
  { id: "aarti-sandhya", queries: ["Aarti", "Ganga aarti Varanasi", "Diya lamps evening"] },
  { id: "aarti-chandana", queries: ["Chandan Yatra", "Sandalwood paste Hindu", "Jagannath Besha"] },
  { id: "aarti-pahuda", queries: ["Gita Govinda", "Pahuda Jagannath", "Bedchamber deities Hindu"] },

  // 6. Gallery (12)
  { id: "gallery-gopuram", queries: ["Singhadwara Puri", "Jagannath Temple, Puri gopuram", "Jagannath Temple, Puri"] },
  { id: "gallery-badadanda", queries: ["Bada Danda Puri", "Ratha Yatra (Puri)", "Grand Road Puri"] },
  { id: "gallery-trinity", queries: ["Jagannath", "Balabhadra Subhadra", "Puri deities"] },
  { id: "gallery-gundicha", queries: ["Gundicha Temple", "Gundicha", "Puri temples"] },
  { id: "gallery-nabakalebara", queries: ["Nabakalebara", "Daru Brahma", "Jagannath wood renewal"] },
  { id: "gallery-beach", queries: ["Puri Beach", "Golden Beach Puri", "Chandrabhaga Beach"] },
  { id: "gallery-chandanyatra", queries: ["Chandan Yatra", "Narendra Pokhari", "Swan boat festival Puri"] },
  { id: "gallery-snanayatra", queries: ["Snana Yatra", "Deba Snana Purnima", "Jagannath bath"] },
  { id: "gallery-kitchen", queries: ["Mahaprasad kitchen Puri", "Ananda Bazaar", "Earthen pots cooking"] },
  { id: "gallery-gitagovinda", queries: ["Gita Govinda", "Jayadeva", "Palm leaf manuscript Odisha"] },
  { id: "gallery-anandabazaar", queries: ["Ananda Bazaar", "Mahaprasad Puri", "Temple courtyard Puri"] },
  { id: "gallery-dancer", queries: ["Odissi dance", "Odissi posture", "Odissi dancer silver ornaments"] },

  // 7. Heritage (8)
  { id: "heritage-konark", queries: ["Konark Sun Temple wheels", "Konark Sun Temple", "Konarka"] },
  { id: "heritage-lingaraj", queries: ["Lingaraja Temple", "Lingaraj temple view", "Bindusagar"] },
  { id: "heritage-udayagiri", queries: ["Udayagiri and Khandagiri Caves", "Hathigumpha inscription"] },
  { id: "heritage-dhauli", queries: ["Dhauli", "Shanti Stupa", "Peace Pagoda Dhauli"] },
  { id: "heritage-chilika", queries: ["Irrawaddy dolphin", "Chilika Lake birds", "Chilika Lake"] },
  { id: "heritage-raghurajpur", queries: ["Raghurajpur", "Pattachitra artist village", "Pattachitra"] },
  { id: "heritage-rajarani", queries: ["Rajarani Temple", "Bhubaneswar temple carvings"] },
  { id: "heritage-ratnagiri", queries: ["Ratnagiri, Odisha", "Lalitgiri", "Diamond Triangle monastery"] }
];

async function fetchWikiImage(query) {
  try {
    const u =
      "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=1280&generator=search&gsrsearch=" +
      encodeURIComponent(query) +
      "&gsrlimit=1";
    const res = await fetch(u, {
      headers: { "User-Agent": "OdishaHeritagePortal/1.0 (info@odisha.gov.in)" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = Object.values(data?.query?.pages || {});
    return pages[0]?.thumbnail?.source || null;
  } catch {
    return null;
  }
}

async function downloadFile(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "OdishaHeritagePortal/1.0 (info@odisha.gov.in)" },
  });
  if (!res.ok) throw new Error("Status " + res.status);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buf));
  return buf.byteLength;
}

async function main() {
  console.log(`Starting download of ${items.length} Odisha heritage photos...`);
  let successCount = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const dest = path.join(targetDir, `${item.id}.jpg`);

    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`[${i + 1}/${items.length}] Skipping existing: ${item.id}.jpg`);
      successCount++;
      continue;
    }

    let foundUrl = null;
    for (const q of item.queries) {
      foundUrl = await fetchWikiImage(q);
      if (foundUrl) break;
      await new Promise((r) => setTimeout(r, 200));
    }

    if (foundUrl) {
      try {
        const size = await downloadFile(foundUrl, dest);
        console.log(`[${i + 1}/${items.length}] OK ${item.id}.jpg (${Math.round(size / 1024)} KB)`);
        successCount++;
      } catch (err) {
        console.warn(`[${i + 1}/${items.length}] FAILED download for ${item.id}:`, err.message);
      }
    } else {
      console.warn(`[${i + 1}/${items.length}] NO URL found for ${item.id}`);
    }

    // Friendly delay to avoid rate-limiting
    await new Promise((r) => setTimeout(r, 400));
  }

  console.log(`\nDone! Successfully saved ${successCount}/${items.length} photos.`);
}

main().catch(console.error);
