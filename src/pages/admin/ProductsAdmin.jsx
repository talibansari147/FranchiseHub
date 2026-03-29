import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, editProduct, deleteProduct } from '../../features/productSlice';

export default function ProductsAdmin() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  
  const [formData, setFormData] = useState({ name: '', price: '', image: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
       dispatch(editProduct({ id: editingId, updated: { ...formData, price: Number(formData.price) } })).then(() => {
          setEditingId(null);
          setFormData({ name: '', price: '', image: '' });
       });
    } else {
       const newProduct = { ...formData, price: Number(formData.price), id: Date.now().toString() };
       dispatch(addProduct(newProduct)).then(() => setFormData({ name: '', price: '', image: '' }));
    }
  };

  const handleEditInit = (p) => {
     setEditingId(p.id);
     setFormData({ name: p.name, price: p.price, image: p.image });
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
     setEditingId(null);
     setFormData({ name: '', price: '', image: '' });
  };

  const handleDelete = (id) => {
    if(window.confirm("Remove this product from the master catalog?")) dispatch(deleteProduct(id));
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-8">Master Catalog Operations</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100 p-8 self-start sticky top-24">
          <div className="flex justify-between items-center mb-6 border-b border-fuchsia-100 pb-3">
             <h2 className="text-xl font-bold text-fuchsia-900">{editingId ? 'Edit Product Payload' : 'Append New Product'}</h2>
             {editingId && (
                <button type="button" onClick={handleCancelEdit} className="text-sm font-bold text-slate-400 hover:text-slate-700">Cancel</button>
             )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Display Name</label>
               <input required type="text" placeholder="E.g. Wrap Meal" className="w-full border-slate-200 border rounded-xl p-3 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 bg-slate-50 transition-colors"
                 value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Unit Price (Rs)</label>
               <input required type="number" min="0" placeholder="450" className="w-full border-slate-200 border rounded-xl p-3 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 bg-slate-50 transition-colors"
                 value={formData.price} onChange={e => setFormData({...formData, price: Math.max(0, e.target.value)})} />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Image Source (URL)</label>
               <input type="text" placeholder="https://unsplash..." className="w-full border-slate-200 border rounded-xl p-3 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 bg-slate-50 transition-colors"
                 value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
               {formData.image && <img src={formData.image} className="mt-4 w-full h-32 object-cover rounded-xl shadow-sm border border-slate-200" alt="Preview" />}
            </div>
            <button type="submit" className={`w-full text-white font-bold px-4 py-3 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 ${editingId ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30' : 'bg-fuchsia-600 hover:bg-fuchsia-700 shadow-fuchsia-600/30'}`}>
              {editingId ? 'Update Product Details' : 'Launch Product'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map(p => (
                <div key={p.id} className="bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col group relative">
                  <div className="h-48 overflow-hidden relative">
                    {p.image ? (
                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={p.name} />
                    ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">No Img</div>
                    )}
                  </div>
                  
                  {/* Actions overlay */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button onClick={() => handleEditInit(p)} className="bg-white/95 backdrop-blur text-indigo-600 p-2 rounded-full shadow-sm hover:bg-indigo-50" title="Edit Item">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                     </button>
                     <button onClick={() => handleDelete(p.id)} className="bg-white/95 backdrop-blur text-red-500 p-2 rounded-full shadow-sm hover:bg-red-50" title="Delete Item">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                     </button>
                  </div>

                  <div className="p-5 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800 text-lg">{p.name}</h3>
                    <span className="font-black text-fuchsia-600 text-xl bg-fuchsia-100 px-3 py-1 rounded-lg">Rs {p.price}</span>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
