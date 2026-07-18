import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import { Row, Col, Card } from 'react-bootstrap';

const BrandBar = observer(() => {
    const { product } = useContext(Context);
    return (
        <Row className='flex-row flex-nowrap overflow-auto'>
            <Col xs="auto" className="p-0 me-2">
                <Card
                    className={`p-3 brand-bar__card${!product.selectedBrand.id ? ' brand-bar__card--active' : ''}`}
                    onClick={() => product.setSelectedBrand({})}
                    border={!product.selectedBrand.id ? 'danger' : 'light'}
                >
                    Todos
                </Card>
            </Col>
            {product.brands.map(brand =>
                <Col xs="auto" key={brand.id} className="p-0 me-2">
                    <Card
                        className={`p-3 brand-bar__card${brand.id === product.selectedBrand.id ? ' brand-bar__card--active' : ''}`}
                        onClick={() => product.setSelectedBrand(brand)}
                        border={brand.id === product.selectedBrand.id ? 'danger' : 'light'}
                    >
                        {brand.name}
                    </Card>
                </Col>
            )}
        </Row>
    );
});

export default BrandBar;