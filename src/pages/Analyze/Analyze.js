'use client'
import axios from 'axios';
import { useState } from 'react';
import { Buffer } from 'buffer';

const config = require('./config.js');

const baseurl = config.baseurl;

export function Analyze() {
    const [file, setFile] = useState(null);
    const [output, setOutput] = useState('Upload to see result');
    const [numFiles, setNumFiles] = useState('loading...');
    const [fileSubmitted, setFileSubmitted] = useState(false);

    function handleChange(event) {
        console.log('handling file')
        setFile(event.target.files[0]);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const api = '/upload';
        const url = baseurl + api;

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (!file) {
            console.log('no file detected');
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            console.log('reading text...');
            const text = (fileReader.result);
            if (text === '') {
                console.log('empty file');
                return;
            }

            const fileBytes = Buffer.from(text);

            const data = JSON.parse(JSON.stringify({
                'filename': file.name,
                'data': fileBytes.toString('base64')
            }));

            console.log('calling /upload...')
            axios.post(url, data, config).then((response) => {
                console.log(response);
                setFileSubmitted(true)

                let output = getOutput();
                Promise.resolve(output);
            }).catch((err) => {
                console.log(err);
                return;
            });
        }

        fileReader.readAsText(file);
    }

    async function getOutput() {
        const api = '/download';
        const url = baseurl + api;

        if (!fileSubmitted) {
            setOutput('Submit a file first!');
            return;
        }

        setOutput('Updating...');

        await axios.get(url, config).then((response) => {
            console.log(response);
            const fileBytes = Buffer.from(response.data, 'base64').toString();
            let resArray = fileBytes.split('\n');
            var output = resArray[resArray.length - 2]
            setOutput(output.substring(6));
        }).catch((err) => {
            console.log(err);
            setOutput('Error, try again.')
        })
    }

    window.onload = async function statsCaller() {
        let res = stats();

        Promise.resolve(res);
    }

    async function stats() {
        const api = '/stats';
        const url = baseurl + api;

        await axios.get(url).then((response) => {
            console.log(response);
            setNumFiles(response.data);
        }).catch((err) => {
            console.log(err);
            return;
        });
    }

    async function clear() {
        const api = '/clear';
        const url = baseurl + api;

        await axios.delete(url).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
            return;
        });
    }

    return (
        <div>
            <div className='flex justify-center p-5 bg-red-700 text-white text-2xl animate-pulse'>DOES NOT WORK ANYMORE!</div>
            <div className='flex justify-center mt-16 mb-10'>
                <div>
                    <div className='bg-gray-800 h-[24rem] min-w-[48rem] max-w-fit cursor-pointer text-white py-5 px-12 flex justify-center items-center hover:bg-indigo-900 duration-500 transition relative' onClick={getOutput}>
                        <p className='text-4xl'>{output}</p>
                        <p className='text-xs absolute inset-x-0 bottom-0 text-gray-300'>Click to update</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className='mt-5'>
                    <p className='font-semibold text-2xl'>Upload file here</p>
                    <form onSubmit={handleSubmit} className='flex justify-between items-center p-5 border-2 border-black w-[40rem] mb-2'>
                        <input type='file' onChange={(e) => handleChange(e)} />
                        <input type='submit' className='py-3 px-5 w-32 bg-gray-700 cursor-pointer hover:bg-gray-500 duration-300 rounded-lg text-white' />
                    </form>
                    <div className='flex justify-between items-center'>
                        <div className='text-lg flex items-center'>
                            <p>There are <b>{numFiles}</b> file(s) uploaded currently.</p>
                            <button className='text-center text-xs bg-gray-700 text-white w-16 h-8 rounded-lg ml-4' onClick={stats}>
                                Refresh
                            </button>
                        </div>
                        <button className='text-center bg-gray-700 hover:bg-gray-500 duration-300 py-3 px-5 w-32 text-white mx-5 rounded-lg' onClick={clear}>
                            Clear files
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
