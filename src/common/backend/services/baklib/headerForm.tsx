import { Form, Select, TreeSelect, Radio } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { Fragment } from 'react';
import locale from '@/common/locales';
import { Repository } from '../interface';
import { useFetch } from '@shihengtech/hooks';
import backend from '../..';
import BaklibDocumentService from './service';

const HeaderForm: React.FC<FormComponentProps & { currentRepository: Repository }> = ({
  form: { getFieldDecorator },
  currentRepository,
}) => {
  const service = backend.getDocumentService() as BaklibDocumentService;
  const channals = useFetch(() => {
    if (currentRepository) {
      return service.getTentChannel(currentRepository.id);
    }
    return [];
  }, [currentRepository]);

  return (
    <Fragment>
      <Form.Item>
        {getFieldDecorator('channel', {
          rules: [],
        })(
          <TreeSelect
            treeData={channals.data}
            style={{ width: '100%' }}
            placeholder={locale.format({
              id: 'backend.services.baklib.headerForm.channel',
              defaultMessage: 'Channel',
            })}
          />
        )}
      </Form.Item>
      <Form layout="inline">
        <Form.Item label="状态">
          {getFieldDecorator('status', {
            initialValue: 1,
          })(
            <Radio.Group>
              <Radio value={0}> 草稿</Radio>
              <Radio value={1}>发布</Radio>
            </Radio.Group>
          )}
        </Form.Item>
      </Form>
      <Form.Item>
        {getFieldDecorator('tags', {
          initialValue: [],
        })(
          <Select
            mode="tags"
            maxTagCount={3}
            style={{ width: '100%' }}
            placeholder={locale.format({
              id: 'backend.services.baklib.headerForm.tags',
              defaultMessage: 'Tags',
            })}
          ></Select>
        )}
      </Form.Item>
    </Fragment>
  );
};

export default HeaderForm;
