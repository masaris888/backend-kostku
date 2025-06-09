// src/handlers/kamar.js
const corsHeaders = {
	"Access-Control-Allow-Origin": "*", // atau bisa ditentukan spesifik domain
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization"
  };
//   membuat function untuk mengambil data semua kamar dari table kamar di database sqlite
export async function getAllKamar(env) {
	try {
	  const result = await env.DB.prepare("SELECT * FROM kamar").all();
	  console.log("📦 Fetched kamar:", result);
	  return new Response(JSON.stringify(result.results), {
		headers: corsHeaders
	  });
	} catch (err) {
	  console.error("❌ DB Error (GET):", err);
	  throw err;
	}
  }
  //end getAllKamar

// membuat function untuk menambahkan data kamar baru ke table kamar di database sqlite
  export async function createKamar(env, request) {
	try {
	  const body = await request.json();
	  const { nama, lokasi, harga } = body;

	  console.log("📥 Incoming data:", body);

	  // Cek apakah semua nilai yang diperlukan ada
	  if (!nama || !lokasi || !harga) {
		return new Response(JSON.stringify({ success: false, message: "Missing required fields" }), {
		  status: 400,
		  headers: corsHeaders
		});
	  }

	  const stmt = env.DB.prepare(
		"INSERT INTO kamar (nama, lokasi, harga) VALUES (?, ?, ?)"
	  ).bind(nama, lokasi, harga);

	  await stmt.run();

	  return new Response(JSON.stringify({ success: true }), {
		headers: corsHeaders
	  });
	} catch (err) {
	  console.error("❌ DB Error (POST):", err);
	  return new Response(JSON.stringify({ success: false, message: "Error creating kamar" }), {
		status: 500,
		headers: corsHeaders
	  });
	}
  }
// end createKamar

// membuat function untuk mengupdate data kamar berdasarkan id di table kamar di database sqlite
  export async function updateKamar(env, request, id) {
	//menggunakan try catch untuk menangani error
	try {
	  const body = await request.json();
	  const { nama, lokasi, harga } = body;

	  if (!nama || !lokasi || !harga) {
		return new Response(JSON.stringify({ success: false, message: "Missing required fields" }), {
		  status: 400,
		  headers: corsHeaders
		});
	  }

	  const stmt = env.DB.prepare(
		"UPDATE kamar SET nama = ?, lokasi = ?, harga = ? WHERE id = ?"
	  ).bind(nama, lokasi, harga, id);

	  await stmt.run();

	  return new Response(JSON.stringify({ success: true }), {
		headers: corsHeaders
	  });
	} catch (err) {
	  console.error("❌ DB Error (PUT):", err);
	  return new Response(JSON.stringify({ success: false, message: "Error updating kamar" }), {
		status: 500,
		headers: corsHeaders
	  });
	}
  }
  // end updateKamar


// membuat function untuk menghapus data kamar berdasarkan id di table kamar di database sqlite
  export async function deleteKamar(env, id) {
	//menggunakan try catch untuk menangani error
	try {
	  const stmt = env.DB.prepare("DELETE FROM kamar WHERE id = ?").bind(id);
	  const result = await stmt.run();

	  console.log(`🗑️ Deleted kamar ID ${id}`);

	  return new Response(JSON.stringify({ success: true, changes: result.meta.changes }), {
		headers: corsHeaders
	  });
	} catch (err) {
	  console.error("❌ DB Error (DELETE):", err);
	  return new Response(JSON.stringify({ success: false, message: "Error deleting kamar" }), {
		status: 500,
		headers: corsHeaders
	  });
	}
  }
  // end deleteKamar



