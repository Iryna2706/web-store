import React, { useContext, useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { Context } from "../../index";
import { createBrand } from '../../http/productAPI'

const CreateBrand = ({show, onHide}) => {
    const product = useContext(Context)?.product ?? { brands: [] };
    const [brandName, setBrandName] = useState('');
    const [search, setSearch] = useState('');

    const filteredBrands = product.brands.filter(brand => 
        brand.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelectBrand = (brand) => {
        setBrandName(brand.name);
        setSearch('');
    };

    const handleAddBrand = async () => {
        if (!brandName.trim()) {
            alert('Escreva o nome da marca!');
            return;
        }
        try {
            const data = await createBrand(brandName)
            if (product && product.setBrands) {
                product.setBrands([...(product.brands || []), data])
            }
            alert('Marca adicionada com sucesso!');
            setBrandName('');
            onHide();
        } catch (e) {
            console.error('Erro ao criar marca:', e)
            alert('Erro ao criar marca: ' + (e.response?.data?.message || e.message))
        }
    };

    return (
         <Modal
         show={show}
         onHide={onHide}
         size="lg"
         centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Adicionar nova marca
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
         <Form>
            <Form.Label><strong>Marcas Existentes:</strong></Form.Label>
            <Dropdown className="w-100 mb-3" drop="down">
                <Dropdown.Toggle variant="info" className="w-100">
                    {product.brands.length > 0 ? 'Ver marcas disponíveis' : 'Nenhuma marca disponível'}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                    <Form.Control 
                        placeholder="Procurar marca..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="m-2"
                        style={{width: 'calc(100% - 16px)'}}
                    />
                    {filteredBrands.length > 0 ? (
                        filteredBrands.map(brand =>
                            <Dropdown.Item 
                                key={brand.id}
                                onClick={() => handleSelectBrand(brand)}
                            >
                                {brand.name}
                            </Dropdown.Item>
                        )
                    ) : (
                        <Dropdown.Item disabled>Nenhuma marca encontrada</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>

            <Form.Label><strong>Ou Crie uma Nova Marca:</strong></Form.Label>
            <Form.Control
                placeholder="Escreva o nome da marca"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
            />
         </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Fechar</Button>
        <Button variant="outline-success" onClick={handleAddBrand}>Adicionar</Button>
      </Modal.Footer>
    </Modal>
    );
}

export default CreateBrand;