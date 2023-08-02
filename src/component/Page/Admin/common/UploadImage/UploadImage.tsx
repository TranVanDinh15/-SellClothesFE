import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { uploadImageRequest } from '../../../../utils/Api/Api';
import { GetContext } from '../Context/Context';
import { itemsMultipleFile } from './UploadInterface';
interface uploadImageProps {
    multilple: any;
}
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
export default function UploadImageCustomer({ multilple }: uploadImageProps) {
    const { imagesUploadMultiple, setImagesUploadMultiple, imageDp, setImageDp }: any = GetContext();
    console.log(imageDp);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    // const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    // Xử lý khi update nhiều ảnh
    const uploadImageMultiple = async (options: any) => {
        const { onSuccess, onError, file, onProgress } = options;
        try {
            // setImagesUploadMultiple();
            const formData = new FormData();
            formData.append('images', file);
            const response = await uploadImageRequest(formData);
            if (response) {
                setImagesUploadMultiple((state: any) => [
                    ...state,
                    {
                        uid: file.uid,
                        image: response.data.images[0],
                    },
                ]);
                onSuccess(file);
            }
        } catch (error) {
            onError(file);
        }
    };
    // Xử lý khi remove ảnh
    const hanleRemove = (file: any) => {
        console.log(file);
        const filterRemove = imagesUploadMultiple.filter((item: any) => {
            return item.uid != file.uid;
        });
        setImagesUploadMultiple(filterRemove);
    };
    // Xử lý khi update một ảnh
    const uploadImageSingle = () => {};

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        console.log(newFileList);
        setImageDp(newFileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                customRequest={multilple ? uploadImageMultiple : uploadImageSingle}
                listType="picture-card"
                fileList={imageDp}
                onPreview={handlePreview}
                onChange={handleChange}
                accept="image/*"
                multiple={multilple ? multilple : false}
                onRemove={(file) => {
                    hanleRemove(file);
                    console.log('ok');
                }}
            >
                {imageDp.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
}
