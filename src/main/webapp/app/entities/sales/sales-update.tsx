import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './sales.reducer';
import { ISales } from 'app/shared/model/sales.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISalesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SalesUpdate = (props: ISalesUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { salesEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/sales');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...salesEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="testApp.sales.home.createOrEditLabel">
            <Translate contentKey="testApp.sales.home.createOrEditLabel">Create or edit a Sales</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : salesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="sales-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="sales-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="descriptionLabel" for="sales-description">
                  <Translate contentKey="testApp.sales.description">Description</Translate>
                </Label>
                <AvField id="sales-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="sales-state">
                  <Translate contentKey="testApp.sales.state">State</Translate>
                </Label>
                <AvInput
                  id="sales-state"
                  type="select"
                  className="form-control"
                  name="state"
                  value={(!isNew && salesEntity.state) || 'IN_CHARGE'}
                >
                  <option value="IN_CHARGE">{translate('testApp.State.IN_CHARGE')}</option>
                  <option value="SHIPPED">{translate('testApp.State.SHIPPED')}</option>
                  <option value="DELIVERED">{translate('testApp.State.DELIVERED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="dateLabel" for="sales-date">
                  <Translate contentKey="testApp.sales.date">Date</Translate>
                </Label>
                <AvField id="sales-date" type="date" className="form-control" name="date" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/sales" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  salesEntity: storeState.sales.entity,
  loading: storeState.sales.loading,
  updating: storeState.sales.updating,
  updateSuccess: storeState.sales.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalesUpdate);
