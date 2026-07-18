import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateProduct from "../components/modals/CreateProduct";
import CreateType from "../components/modals/CreateType";
import { getAllUsers, deleteUser } from "../http/userAPI";
import { fetchTypes, fetchBrands, fetchProducts, deleteType, deleteBrand, deleteProduct } from "../http/productAPI";

const Admin = () => {
    const [brandVisible, setBrandVisible] = React.useState(false);
    const [productVisible, setProductVisible] = React.useState(false);
    const [typeVisible, setTypeVisible] = React.useState(false);
    const [usersVisible, setUsersVisible] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [types, setTypes] = React.useState([]);
    const [brands, setBrands] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [typesVisible, setTypesVisible] = React.useState(false);
    const [brandsVisible, setBrandsVisible] = React.useState(false);
    const [productsVisible, setProductsVisible] = React.useState(false);

    React.useEffect(() => {
        if (usersVisible) {
            carregarUtilizadores();
        }
    }, [usersVisible]);

    React.useEffect(() => {
        if (typesVisible) carregarTipos()
    }, [typesVisible])

    React.useEffect(() => {
        if (brandsVisible) carregarMarcas()
    }, [brandsVisible])

    React.useEffect(() => {
        if (productsVisible) carregarProdutos()
    }, [productsVisible])

    const carregarUtilizadores = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response.data);
        } catch(e) {
            console.error('Erro ao carregar utilizadores:', e);
        }
    };

    const carregarTipos = async () => {
        try {
            const data = await fetchTypes()
            setTypes(data)
        } catch(e) {
            console.error('Erro ao carregar tipos:', e)
        }
    }

    const carregarMarcas = async () => {
        try {
            const data = await fetchBrands()
            setBrands(data)
        } catch(e) {
            console.error('Erro ao carregar marcas:', e)
        }
    }

    const carregarProdutos = async () => {
        try {
            const data = await fetchProducts({ limit: 1000 })
            setProducts(data.rows || data)
        } catch(e) {
            console.error('Erro ao carregar produtos:', e)
        }
    }

    const apagarUtilizador = async (id) => {
        if (window.confirm('Tem certeza que deseja apagar este utilizador?')) {
            try {
                await deleteUser(id);
                alert('✓ Utilizador eliminado com sucesso!');
                carregarUtilizadores();
            } catch(e) {
                console.error('Erro ao apagar utilizador:', e);
                alert('Erro ao apagar utilizador: ' + (e.response?.data?.message || e.message));
            }
        }
    };

    const apagarTipo = async (id) => {
        if (window.confirm('Tem certeza que deseja apagar este tipo?')) {
            try {
                await deleteType(id)
                alert('✓ Tipo eliminado com sucesso!')
                carregarTipos()
            } catch(e) {
                console.error('Erro ao apagar tipo:', e)
                alert('Erro ao apagar tipo: ' + (e.response?.data?.message || e.message))
            }
        }
    }

    const apagarMarca = async (id) => {
        if (window.confirm('Tem certeza que deseja apagar esta marca?')) {
            try {
                await deleteBrand(id)
                alert('✓ Marca eliminada com sucesso!')
                carregarMarcas()
            } catch(e) {
                console.error('Erro ao apagar marca:', e)
                alert('Erro ao apagar marca: ' + (e.response?.data?.message || e.message))
            }
        }
    }

    const apagarProduto = async (id) => {
        if (window.confirm('Tem certeza que deseja apagar este produto?')) {
            try {
                await deleteProduct(id)
                alert('✓ Produto eliminado com sucesso!')
                carregarProdutos()
            } catch(e) {
                console.error('Erro ao apagar produto:', e)
                alert('Erro ao apagar produto: ' + (e.response?.data?.message || e.message))
            }
        }
    }

    return (
                <Container className="d-flex flex-column align-items-center">
                     <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                         <Button variant="outline-dark" className="p-2" onClick={() => setTypeVisible(true)}>
                             Adicionar Tipo
                         </Button>
                         <Button variant="outline-dark" className="p-2" onClick={() => setBrandVisible(true)}>
                             Adicionar Marca
                         </Button>
                         <Button variant="outline-dark" className="p-2" onClick={() => setProductVisible(true)}>
                             Adicionar Produto
                         </Button>
                     </div>

                         <div className="mt-4 w-100">
                                 <div className="d-flex gap-2 mb-3 justify-content-center flex-wrap">
                                     <Button variant={usersVisible ? 'dark' : 'outline-dark'} onClick={() => setUsersVisible(!usersVisible)}>
                                         {usersVisible ? 'Ocultar gestão de utilizadores' : 'Gerir utilizadores'}
                                     </Button>
                                     <Button variant={typesVisible ? 'dark' : 'outline-dark'} onClick={() => setTypesVisible(!typesVisible)}>Gerir Tipos</Button>
                                     <Button variant={brandsVisible ? 'dark' : 'outline-dark'} onClick={() => setBrandsVisible(!brandsVisible)}>Gerir Marcas</Button>
                                     <Button variant={productsVisible ? 'dark' : 'outline-dark'} onClick={() => setProductsVisible(!productsVisible)}>Gerir Produtos</Button>
                                 </div>

                         {usersVisible && (
             <div className="mt-4 w-75">
                 <h3>Gerir Utilizadores</h3>
                 <Table striped bordered hover>
                   <thead>
                       <tr>
                           <th>ID</th>
                           <th>Email</th>
                           <th>Role</th>
                           <th>Ação</th>
                       </tr>
                   </thead>
                   <tbody>
                       {users.map(user => (
                           <tr key={user.id}>
                               <td>{user.id}</td>
                               <td>{user.email}</td>
                               <td>{user.role}</td>
                               <td>
                                   <Button 
                                       variant="danger" 
                                       size="sm"
                                       onClick={() => apagarUtilizador(user.id)}
                                   >
                                       Apagar
                                   </Button>
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </Table>
           </div>
           )}

                         {typesVisible && (
                             <div className="mt-4 w-75">
                                 <h3>Gerir Tipos</h3>
                                 <Table striped bordered hover>
                                     <thead>
                                         <tr>
                                             <th>ID</th>
                                             <th>Nome</th>
                                             <th>Ação</th>
                                         </tr>
                                     </thead>
                                     <tbody>
                                         {types.map(t => (
                                             <tr key={t.id}>
                                                 <td>{t.id}</td>
                                                 <td>{t.name}</td>
                                                 <td>
                                                     <Button variant="danger" size="sm" onClick={() => apagarTipo(t.id)}>Apagar</Button>
                                                 </td>
                                             </tr>
                                         ))}
                                     </tbody>
                                 </Table>
                             </div>
                         )}

                         {brandsVisible && (
                             <div className="mt-4 w-75">
                                 <h3>Gerir Marcas</h3>
                                 <Table striped bordered hover>
                                     <thead>
                                         <tr>
                                             <th>ID</th>
                                             <th>Nome</th>
                                             <th>Ação</th>
                                         </tr>
                                     </thead>
                                     <tbody>
                                         {brands.map(b => (
                                             <tr key={b.id}>
                                                 <td>{b.id}</td>
                                                 <td>{b.name}</td>
                                                 <td>
                                                     <Button variant="danger" size="sm" onClick={() => apagarMarca(b.id)}>Apagar</Button>
                                                 </td>
                                             </tr>
                                         ))}
                                     </tbody>
                                 </Table>
                             </div>
                         )}

                         {productsVisible && (
                             <div className="mt-4 w-75">
                                 <h3>Gerir Produtos</h3>
                                 <Table striped bordered hover>
                                     <thead>
                                         <tr>
                                             <th>ID</th>
                                             <th>Nome</th>
                                             <th>Preço</th>
                                             <th>Ação</th>
                                         </tr>
                                     </thead>
                                     <tbody>
                                         {products.map(p => (
                                             <tr key={p.id}>
                                                 <td>{p.id}</td>
                                                 <td>{p.name}</td>
                                                 <td>{p.price}</td>
                                                 <td>
                                                     <Button variant="danger" size="sm" onClick={() => apagarProduto(p.id)}>Apagar</Button>
                                                 </td>
                                             </tr>
                                         ))}
                                     </tbody>
                                 </Table>
                             </div>
                         )}

          </div>

           <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
           <CreateProduct
             show={productVisible}
             onHide={() => setProductVisible(false)}
             onAdd={() => {
               carregarProdutos();
               setProductsVisible(true);
             }}
           />
           <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
        </Container>
    );
}

export default Admin;