import React, { useState, useEffect } from 'react';
import {
    Form,
    TextArea,
} from 'semantic-ui-react';
import axios from 'axios';

export default function Translate(props) {
    let userTxt = (props.textVal) ? props.textVal : ''
    const [resultText, setResultText] = useState('');

    const translateText = () => {
        let data = {
            q :  userTxt,
            source: 'en',
            target: 'hi'
        }
        axios.post(`https://libretranslate.de/translate`, data)
        .then((response) => {
            setResultText(response.data.translatedText)
        })
        console.log("inside",resultText)
    }

    useEffect(() => {
       axios.get(`https://libretranslate.de/languages`)
       .then((response) => {
       })
       translateText()
    }, [userTxt])

    return (
        <div>
            <div className='app-body'>
                <div>
                    <Form>
                        <Form.Field
                            control={TextArea}
                            placeholder='Your Result Translation..'
                            value={resultText}
                        />
                    </Form>
                </div>
            </div>
        </div>
    )
}
