import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap";
import { createProduct, fetchTypes, fetchBrands } from "../../http/productAPI";

const CreateProduct = ({ show, onHide, onAdd }) => {
    const [types, setTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [info, setInfo] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [searchType, setSearchType] = useState('');
    const [searchBrand, setSearchBrand] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [typesData, brandsData] = await Promise.all([fetchTypes(), fetchBrands()]);
                setTypes(typesData || []);
                setBrands(brandsData || []);
            } catch (e) {
                console.error('Erro ao carregar tipos ou marcas:', e);
            }
        };

        if (show) {
            loadData();
        }
    }, [show]);

    const addInfo = () => {
        setInfo(prevInfo => [...prevInfo, { title: '', description: '', number: Date.now() }])
    }

    const changeInfo = (key, value, number) => {
        setInfo(prevInfo => prevInfo.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const removeInfo = (number) => {
        setInfo(prevInfo => prevInfo.filter(i => i.number !== number))
    }

    const filteredTypes = types.filter(type => 
        type.name.toLowerCase().includes(searchType.toLowerCase())
    );

    const filteredBrands = brands.filter(brand => 
        brand.name.toLowerCase().includes(searchBrand.toLowerCase())
    );

    const handleSelectType = (type) => {
        setSelectedType(type);
        setSearchType('');
    };

    const handleSelectBrand = (brand) => {
        setSelectedBrand(brand);
        setSearchBrand('');
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleAddProduct = async () => {
        if (!selectedType || !selectedBrand || !name || !price || !image) {
            alert('Preencha todos os campos obrigatórios!');
            return;
        }

        const validInfo = info
            .map(({ title, description }) => ({ title: title?.trim(), description: description?.trim() }))
            .filter(item => item.title && item.description);

        if (info.length > 0 && validInfo.length !== info.length) {
            alert('Preencha título e descrição para todas as características ou remova as vazias.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('brandId', selectedBrand.id);
            formData.append('typeId', selectedType.id);
            formData.append('img', image);
            if (validInfo.length > 0) {
                formData.append('info', JSON.stringify(validInfo));
            }

            await createProduct(formData);
            alert('Produto adicionado com sucesso!');

            setName('');
            setPrice('0');
            setSelectedType(null);
            setSelectedBrand(null);
            setImage(null);
            setInfo([]);

            if (typeof onAdd === 'function') {
                onAdd();
            }
            onHide();
        } catch (e) {
            console.error('Erro ao adicionar produto:', e);
            alert('Erro ao adicionar produto: ' + (e.response?.data?.message || e.message));
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
             Adicionar novo produto
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Form className="create-product-form">
             {/* Tipo Dropdown */}
             <Dropdown className="create-product-field" drop="down">
                <Dropdown.Toggle variant="primary">
                    {selectedType ? selectedType.name : 'Escolha o tipo'}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{width: '100%'}}>
                    <Form.Control 
                        placeholder="Procurar tipo..."
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="m-2"
                        style={{width: 'calc(100% - 16px)'}}
                    />
                    {filteredTypes.length > 0 ? (
                        filteredTypes.map(type =>
                            <Dropdown.Item 
                                key={type.id}
                                onClick={() => handleSelectType(type)}
                                active={selectedType?.id === type.id}
                            >
                                {type.name}
                            </Dropdown.Item>
                        )
                    ) : (
                        <Dropdown.Item disabled>Nenhum tipo encontrado</Dropdown.Item>
                    )}
                </Dropdown.Menu>
             </Dropdown>

             {/* Brand Dropdown */}
             <Dropdown className="create-product-field" drop="down">
                <Dropdown.Toggle variant="primary">
                    {selectedBrand ? selectedBrand.name : 'Escolha o brand'}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{width: '100%'}}>
                    <Form.Control 
                        placeholder="Procurar brand..."
                        value={searchBrand}
                        onChange={(e) => setSearchBrand(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="m-2"
                        style={{width: 'calc(100% - 16px)'}}
                    />
                    {filteredBrands.length > 0 ? (
                        filteredBrands.map(brand =>
                            <Dropdown.Item 
                                key={brand.id}
                                onClick={() => handleSelectBrand(brand)}
                                active={selectedBrand?.id === brand.id}
                            >
                                {brand.name}
                            </Dropdown.Item>
                        )
                    ) : (
                        <Dropdown.Item disabled>Nenhum brand encontrado</Dropdown.Item>
                    )}
                </Dropdown.Menu>
             </Dropdown>

             <Form.Control 
                className="create-product-field" 
                placeholder="Escreva o nome do produto"
                value={name}
                onChange={(e) => setName(e.target.value)}
             />
             <Form.Control 
                className="create-product-field" 
                placeholder="Introduza o preço do produto" 
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
             />
             <Form.Control 
                className="create-product-field" 
                placeholder="Selecione a imagem" 
                type="file"
                onChange={handleFileChange}
             />
             <hr/>
             <Button variant="outline-dark" onClick={addInfo} className="create-product-field">
               Adicionar novos propriedades
             </Button>
             {info.map(i => 
                <Row key={i.number} className="g-2 create-product-row">
                    <Col md={4}>
                        <Form.Control
                            placeholder="Introduza o nome da propriedade"
                            value={i.title}
                            onChange={(e) => changeInfo('title', e.target.value, i.number)}
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Control
                            placeholder="Introduza a descrição da propriedade"
                            value={i.description}
                            onChange={(e) => changeInfo('description', e.target.value, i.number)}
                        />
                    </Col>
                    <Col md={4}>
                        <Button  variant="outline-danger" onClick={() => removeInfo(i.number)}>
                            Eliminar
                        </Button>
                    </Col>
                </Row>
             )} 
           </Form>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="outline-danger" onClick={onHide}>Fechar</Button>
           <Button variant="outline-success" onClick={handleAddProduct}>Adicionar</Button>
         </Modal.Footer>
       </Modal>
    );
}

export default CreateProduct;
