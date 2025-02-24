import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import Loader from "@/components/Loader/Loader";
import RenderCode from "@/components/RenderCode";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useLoadCodeMutation } from "@/redux/slices/api";
import { updateFullCode } from "@/redux/slices/compilerSlice";
import { handleError } from "@/utils/handleError";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function Compiler() {
  // const html = useSelector((state:RootState) => state.compilerSlice.html);
  // const css = useSelector((state:RootState) => state.compilerSlice.html);
  // const javascript = useSelector((state:RootState) => state.compilerSlice.html);

  const { urlId } = useParams();
  const [loadExistingCode, { isLoading }] = useLoadCodeMutation();
  const dispatch = useDispatch();

  const loadCode = async () => {
    try {
      if (urlId) {
        const response = await loadExistingCode({ urlId: urlId }).unwrap();
        dispatch(updateFullCode(response.fullCode));
        console.log(response.fullCode);
      }
    } catch (error) {
      // if (axios.isAxiosError(error)) {
      //   if (error.response?.status == 500) {
      //     toast("Invalid URL, Default Code Loaded");
      //   }
      // }
      handleError(error);
    }
  };
  useEffect(() => {
    if (urlId) {
      loadCode();
    }
  }, [urlId]);
  if (isLoading) {
    return (
      <div className="w-full h-[calc(100dvh-60px)] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  //console.log(urlId);
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="  border md:min-w-[450px]"
    >
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[250px]"
        defaultSize={50}
      >
        <HelperHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[250px]"
        defaultSize={50}
      >
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
