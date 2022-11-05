import { useState } from "preact/hooks";
import "antd/dist/antd.css";
import { ConfigQuiz } from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Quizzes } from "./pages/Quizzes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnMount: false, refetchOnWindowFocus: false },
  },
});

export function App() {
  const [fetchQuizConfigurations, setFetchQuizConfigurations] = useState();
  const [isConfigQuiz, setIsConfigQuiz] = useState(true);

  const onQueryQuiz = (newFetchQuizConfigurations: any) => {
    setFetchQuizConfigurations(newFetchQuizConfigurations);
    setIsConfigQuiz(false);
  };

  return (
    <div class="container">
      <QueryClientProvider client={queryClient}>
        {isConfigQuiz && <ConfigQuiz onQueryQuiz={onQueryQuiz} />}
        {!isConfigQuiz && (
          <Quizzes fetchQuizConfigurations={fetchQuizConfigurations} />
        )}
      </QueryClientProvider>
    </div>
  );
}
