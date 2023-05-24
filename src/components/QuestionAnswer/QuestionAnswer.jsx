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

const QuestionAnswer = () => {
  const [getAnswer, { isLoading }] = useGetAnswerMutation();

  const [formData, setFormData] = useState({
    question: '',
  });

  const [answer, setAnswer] = useState(
    'Xin chào! Tôi là trợ lý Q&A của cửa hàng ADNCloth. Hãy đưa ra câu hỏi của bạn để tôi có thể hỗ trợ bạn. Tuy nhiên, tôi chỉ có thể trả lời những câu hỏi liên quan đến sản phẩm của cửa hàng.',
  );

  const handleQuestion = (e) => {
    setFormData((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      const res = await getAnswer(formData);
      setAnswer(res?.data.content);
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
            được tạo tự động
            <strong> và có thể không hoàn toàn chính xác</strong>
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
          value={formData.question}
          onChange={handleQuestion}
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
          disabled={isLoading || !(formData.question.length > 20)}
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
        >
          {answer}
        </Typography>
      )}
    </Container>
  );
};

export default QuestionAnswer;
