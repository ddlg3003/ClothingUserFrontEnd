import React, { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import TextField from '@mui/material/TextField';
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useGetAnswerMutation } from '../../services/questionApis';
import { ROLES } from '../../utils/globalVariables';

const QuestionAnswer = () => {
  const [getAnswer, { isLoading }] = useGetAnswerMutation();

  const [content, setContent] = useState('');

  const [context, setContext] = useState([]);

  const [answer, setAnswer] = useState(
    'Xin chào! Tôi là trợ lý Q&A của cửa hàng ADNCloth. Hãy đưa ra câu hỏi của bạn để tôi có thể hỗ trợ bạn. Tuy nhiên, tôi chỉ có thể trả lời những câu hỏi liên quan đến sản phẩm của cửa hàng.',
  );

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      setContext((prev) => {
        if (prev.length > 4) {
          prev.splice(0, 2);
        }

        return [
          ...prev,
          {
            role: ROLES.user,
            content,
          },
        ];
      });

      const formData = {
        messages: [
          ...context,
          {
            role: ROLES.user,
            content,
          },
        ],
      };

      const res = await getAnswer(formData);
      setAnswer(res?.data.content);

      console.log(res?.data);

      setContext((prev) => {
        if (prev.length > 4) {
          prev.splice(0, 2);
        }
        return [
          ...prev,
          {
            role: ROLES.assistant,
            content: res?.data.content,
          },
        ];
      });
    } catch (error) {
      setAnswer('Đã có lỗi xảy ra');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography
        fontSize="25px"
        fontWeight="normal"
        align="center"
        paddingTop="30px"
      >
        ĐẶT CÂU HỎI
      </Typography>{' '}
      <Stack mt={3} justifyContent="flex-start" alignItems="flex-end">
        <Stack direction="row" spacing={1} width="100%">
          <Alert severity="info">
            Đặt câu hỏi, vui lòng mô tả <strong>tên sản phẩm</strong>,{' '}
            <strong>kích thước</strong>,.. một cách chi tiết. Đây là câu trả lời
            được tạo tự động và có thể
            <strong> không hoàn toàn chính xác</strong>. Hệ thống có thể ghi nhớ
            tối đa <strong> 3 câu hỏi gần nhất</strong> của bạn
          </Alert>
        </Stack>
        <TextField
          id="outlined-textarea"
          label="Câu hỏi"
          placeholder="Ví dụ: Áo Ver77 còn size gì vậy shop?"
          multiline
          rows={4}
          fullWidth
          sx={{ mt: 2 }}
          value={content}
          onChange={handleContent}
        />
        <LoadingButton
          variant="contained"
          color="black"
          style={{
            color: 'white',
            padding: '12px',
            width: '16%',
            marginTop: '16px',
          }}
          size="medium"
          loadingPosition="end"
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading || !(content.length > 15)}
          loading={isLoading}
        >
          Gửi
        </LoadingButton>
      </Stack>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="black" size="6rem" />
        </Box>
      ) : (
        <Typography
          fontSize="20px"
          fontWeight="normal"
          align="left"
          paddingTop="24px"
          // sx={{whiteSpace: 'pre'}}
        >
          {answer}
        </Typography>
      )}
    </Container>
  );
};

export default QuestionAnswer;
