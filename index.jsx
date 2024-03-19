/*
author: edanick
version: 0.0.3
date - time: 13/03/2024 - 21:39:01
*/

import react, { useState } from 'react';

export default function EasyForm(props) {

    const [state, setState] = useState({});

    const presets = {
        payment: ['cardNumber', 'cvv', 'month', 'year'],
        login: ['username', 'password'],
        register: ['username', 'email', 'retypeEmail', 'password', 'retypePassword'],
    }, defaultFields = {
        firstname: ['text', 'First name'],
        lastname: ['text', 'Last name'],
        'username': ['text', 'Username'],
        password: ['password', 'Password'],
        retypePassword: ['password', 'Re-type password'],
        email: ['email', 'Email'],
        retypeEmail: ['email', 'Re-type email'],
        cardNumber: ['number', 'Card number'],
        month: ['number', 'Month'],
        'year': ['number', 'Year'],
        'cvv': ['number', 'CVV']
    };

    let form = state.data ?? {},
        fields = typeof (props.fields) == 'string' ? props.fields.split(', ') : props.fields;

    if (props.preset) { fields = presets[props.preset]; }

    return (
        <form>
            {fields?.map(k => {

                if (Array.isArray(fields)) {

                    let f = defaultFields[k];
                    if (!Object.keys(form).includes(k)) { form[k] = null };
                    return <div>
                        {/* <label>{f[1]}</label>
                    <br></br> */}
                        <input className={props.styles[`input-${f[0]}`] ?? null} type={f[0]} placeholder={f[1]} onKeyUp={
                            (e) => {
                                form[k] = e.target.value; setState({ data: form });
                            }} />
                    </div>

                } else if (typeof (props.fields) == 'object') {

                    return <div>
                        {/* <label>{k.name}</label>
                <br></br> */}
                        <input type={k.type} placeholder={k.title} onKeyUp={
                            (e) => {
                                form[k.name] = e.target.value; setState({ data: form });
                            }} />
                    </div>

                }

            })}
            <input type="button" className={props.styles['input-button'] ?? null} value={props.submitText} onClick={() => props.onSubmit(state.data)} />
        </form>
    );

}

