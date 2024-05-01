// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/ScrollToTop";
import { ProgressBarStyle } from "./components/ProgressBar";
import NotistackProvider from "./components/NotistackProvider";
import ThemeLocalization from "./components/ThemeLocalization";
import MotionLazyContainer from "./components/animate/MotionLazyContainer";

// # production environment
// FROM nginx:1.17
// ARG NODE_ENV
// COPY --from=build /app/build/ /usr/share/nginx/html
// COPY --from=build /app/nginx/${NODE_ENV}.conf /etc/nginx/conf.d/default.conf
// EXPOSE 80
// CMD ["nginx", "-g", "daemon off;"]

const App: React.FC = () => {
  return (
    <ThemeProvider>
        <ThemeLocalization>
            <NotistackProvider>
              <MotionLazyContainer>
                <ProgressBarStyle />
                <ScrollToTop />
                <Router />
              </MotionLazyContainer>
            </NotistackProvider>
        </ThemeLocalization>
    </ThemeProvider>
  );
};

export default App;
