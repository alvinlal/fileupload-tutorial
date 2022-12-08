import './App.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { SubmitHandler, useForm } from 'react-hook-form';

function App() {
  const { handleSubmit, register } = useForm<{ images: FileList; image: FileList }>();

  const uploadSingle: SubmitHandler<{ images: FileList; image: FileList }> = async data => {
    let formData = new FormData();
    formData.set('file', data.image[0]);
    console.log('uploading single file');
    await axios.post('http://localhost:4999/upload-single-file', formData, {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
        console.log(`upload process: ${percentCompleted}%`);
      },
    });
    console.log('upload success');
  };

  const uploadMultiple: SubmitHandler<{ images: FileList; image: FileList }> = async data => {
    let formData = new FormData();
    Object.values(data.images).forEach(file => {
      formData.append('files', file);
    });
    console.log('uploading multiple files');
    await axios.post('http://localhost:4999/upload-multiple-files', formData, {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
        console.log(`upload process: ${percentCompleted}%`);
      },
    });
    console.log('upload success');
  };

  const uploadAnyFile: SubmitHandler<{ images: FileList; image: FileList }> = async data => {
    let formData = new FormData();
    Object.values(data.images).forEach(file => {
      formData.append(uuidv4(), file);
    });
    console.log('uploading multiple files');
    await axios.post('http://localhost:4999/upload-any-files', formData, {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
        console.log(`upload process: ${percentCompleted}%`);
      },
    });
    console.log('upload success');
  };

  const uploadInsideArray: SubmitHandler<{ images: FileList; image: FileList }> = async data => {
    let formData = new FormData();
    let details = {
      involvedVehicles: [
        {
          plateNumber: uuidv4(),
          licenseNumber: uuidv4(),
          phoneNumber: uuidv4(),
          vehiclePhotos: data.images,
        },
        {
          plateNumber: uuidv4(),
          licenseNumber: uuidv4(),
          phoneNumber: uuidv4(),
          vehiclePhotos: data.images,
        },
        {
          plateNumber: uuidv4(),
          licenseNumber: uuidv4(),
          phoneNumber: uuidv4(),
          vehiclePhotos: data.images,
        },
      ],
    };
    formData.set('details', JSON.stringify(details));
    console.log('uploading multiple files');
    await axios.post('http://localhost:4999/upload-inside-array', formData, {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
        console.log(`upload process: ${percentCompleted}%`);
      },
    });
    console.log('upload success');
  };

  return (
    <div className='App'>
      <form encType='multipart/form-data'>
        <label>
          multiple: <input type='file' {...register('images')} multiple />
        </label>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <label>
          single: <input type='file' {...register('image')} />
        </label>
        <br></br>
        <button onClick={handleSubmit(uploadSingle)}>upload single</button>
        <br></br>
        <button onClick={handleSubmit(uploadMultiple)}>upload multiple</button>
        <br></br>
        <button onClick={handleSubmit(uploadAnyFile)}>upload any</button>
        <br></br>
        <button onClick={handleSubmit(uploadInsideArray)}>upload inside array</button>
      </form>
    </div>
  );
}

export default App;
