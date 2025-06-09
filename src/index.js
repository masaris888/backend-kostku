import { createKamar, deleteKamar, getAllKamar, updateKamar } from './handlers/kamar';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    // menangani CORS Method
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': '*'
        }
      });
    }

    try {
      // GET /kamar - Ambil semua kamar
      if (pathname === '/kamar' && request.method === 'GET') {
        return await getAllKamar(env);
      }

      // POST /kamar - Tambah kamar baru
      if (pathname === '/kamar' && request.method === 'POST') {
        return await createKamar(env, request);
      }

      // PUT /kamar/:id - Update kamar berdasarkan ID
      if (pathname.startsWith('/kamar/') && request.method === 'PUT') {
        const id = pathname.split('/')[2];
        return await updateKamar(env, request, id);
      }

      // DELETE /kamar/:id - Hapus kamar berdasarkan ID
      if (pathname.startsWith('/kamar/') && request.method === 'DELETE') {
        const id = pathname.split('/')[2];
        return await deleteKamar(env, id);
      }

      return new Response("Not found", { status: 404, headers: { 'Access-Control-Allow-Origin': '*' } });
    } catch (err) {
      console.error("❌ ERROR:", err.stack || err.message || err);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
    }
  }
};
