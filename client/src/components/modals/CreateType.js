import React, { useContext, useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { Context } from "../../index";
import { createType } from '../../http/productAPI';

const CreateType = ({ show, onHide }) => {
    const { product } = useContext(Context);
    const [typeName, setTypeName] = useState('');
    const [search, setSearch] = useState('');

    const availableTypes = product?.types || [];
    const filteredTypes = availableTypes.filter(type =>
        type.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelectType = (type) => {
        setTypeName(type.name);
        setSearch('');
    };

    const handleAddType = async () => {
        if (!typeName.trim()) {
            alert('Escreva o nome do tipo!');
            return;
        }
        try {
            const data = await createType(typeName);
            if (product && product.setTypes) {
                product.setTypes([...(product.types || []), data]);
            }
            alert('Tipo adicionado com sucesso!');
            setTypeName('');
            onHide();
        } catch (e) {
            console.error('Erro ao criar tipo:', e);
            alert('Erro ao criar tipo: ' + (e.response?.data?.message || e.message));
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Adicionar novo tipo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => { e.preventDefault(); handleAddType(); }}>
                    <Form.Label><strong>Tipos Existentes:</strong></Form.Label>
                    <Dropdown className="w-100 mb-3" drop="down">
                        <Dropdown.Toggle variant="info" className="w-100">
                            {availableTypes.length > 0 ? 'Ver tipos disponíveis' : 'Nenhum tipo disponível'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                            <Form.Control
                                placeholder="Procurar tipo..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="m-2"
                                style={{ width: 'calc(100% - 16px)' }}
                            />
                            {filteredTypes.length > 0 ? (
                                filteredTypes.map(type => (
                                    <Dropdown.Item key={type.id} onClick={() => handleSelectType(type)}>
                                        {type.name}
                                    </Dropdown.Item>
                                ))
                            ) : (
                                <Dropdown.Item disabled>Nenhum tipo encontrado</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Label><strong>Ou Crie um Novo Tipo:</strong></Form.Label>
                    <Form.Control
                        value={typeName}
                        placeholder="Escreva o nome do tipo"
                        onChange={(e) => setTypeName(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Fechar</Button>
                <Button variant="outline-success" onClick={handleAddType}>Adicionar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;