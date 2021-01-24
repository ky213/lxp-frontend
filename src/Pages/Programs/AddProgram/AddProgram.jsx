import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import classes from './AddProgram.module.css';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { AuthInput, CustomSelect, Preloader, TextAreaCustom } from 'Components';
import { required } from 'Utils/validators';
import FieldImageInput from 'Components/Common/FormControlls/FileControlls/FieldImageInput';
import { USER_ROLES } from 'Config/constants';

const AddProgramForm = props => {
  const { t, i18n } = useTranslation();
  let departamentOptions = ['dep1', 'dep2', 'dep3'];

  let maxLength = 300;
  const [charactersLeft, setCharactersLeft] = useState(maxLength);

  let handleTextArea = e => {
    setCharactersLeft(maxLength - e.target.value.length);
  };

  let disableDefSupervisorOption = true;
  let disableDefSupervisorOptionText = t('addProgram.defSelectDepartament');

  const [size, setSize] = useState([window.outerWidth, window.innerHeight]);
  const [selectWidth, setSelectWidth] = useState(66);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.outerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (size[0] > 568) {
      setSelectWidth(66);
    } else {
      setSelectWidth(100);
    }
  }, [size]);

  return (
    <form onSubmit={props.handleSubmit} className={classes.form}>
      <div className={classes.field + ' ' + classes.inputField}>
        <label className={classes.fieldLabel}>{t('addProgram.name')}</label>
        <Field component={AuthInput} placeholder={t('addProgram.namePlaceholder')} name="name" validate={[required]} />
      </div>
      <div className={classes.field}>
        <label className={classes.fieldLabel}>{t('addActivity.supervisor')}</label>
        <p></p>
        <Field
          component={CustomSelect}
          options={departamentOptions}
          setFunction={props.setDepartament}
          width={selectWidth}
          validate={[required]}
          name="departament"
          disableDefValueOption={disableDefSupervisorOption}
          disableDefValueOptionText={disableDefSupervisorOptionText}
        />
      </div>
      <div className={classes.field + ' ' + classes.inputField}>
        <label className={classes.fieldLabel}>{t('addActivity.description')}</label>
        <Field component={TextAreaCustom} name="description" rows={2} onChange={handleTextArea} isBig={true} />
      </div>
      <div className={classes.field + ' ' + classes.inputField}>
        <label className={classes.fieldLabel}>{t('addActivity.description')}</label>
        <Field
          component={TextAreaCustom}
          name="description"
          maxLength={maxLength}
          left={charactersLeft}
          rows={5}
          onChange={handleTextArea}
          isBig={true}
        />
      </div>
      <div className={classes.field}>
        <label className={classes.fieldLabel}>{t('addProgram.uploadTitle')}</label>
        <Field
          component={FieldImageInput}
          downloadText={t('addProgram.upload')}
          dragText={t('addProgram.drag')}
          name="image"
          validate={[required]}
        />
      </div>
      <div className={classes.fieldBut}>
        <button>{t('addProgram.addBut')}</button>
        <NavLink to="/programs">{t('addProgram.cancel')}</NavLink>
      </div>
    </form>
  );
};

const AddProgramReduxForm = reduxForm({ form: 'addProgram' })(AddProgramForm);

const AddProgram = props => {
  const { t, i18n } = useTranslation();
  const [departament, setDepartament] = useState('');

  const onSubmit = formData => {
    console.log(formData);
  };

  return (
    <div className={classes.main}>
      {props.profile.roleId === USER_ROLES.LEARNER && <Redirect to="/" />}
      {props.isFetching && <Preloader />}
      <div className={classes.header}>
        <div className={classes.headerContainer}>
          <h1>{t('addProgram.title')}</h1>
        </div>
      </div>
      <div className={classes.formContainer}>
        <AddProgramReduxForm onSubmit={onSubmit} setDepartament={setDepartament} direction={props.direction} />
      </div>
    </div>
  );
};

let mapStateToProps = state => ({
  isFetching: state.common.isFetching,
  direction: state.common.direction,
  profile: state.authentication.profile,
});

export default connect(mapStateToProps, {})(AddProgram);
