import React, { useEffect } from "react";

// export const DraftField = React.forwardRef((props: any, ref) => {
//   const {
//     component: Component,
//     editorRef,
//     handleOnChange,
//     modules,
//     ...rest
//   } = props;

//   React.useImperativeHandle(ref, () => ({
//     focus: () => {
//       editorRef?.current?.focus();
//     },
//   }));

//   return (
//     <Component
//       {...rest}
//       ref={editorRef}
//       onChange={handleOnChange}
//       modules={modules}
//     />
//   );
// });
export const DraftField = React.forwardRef((props: any, ref) => {
  const { component: Component, editorRef, handleOnChange, ...rest } = props;

  useEffect(() => {
    // 擬似的auto focus
    // setTimeoutでdelayをかけないとpluginが効かなくなる
    // 参照：https://github.com/draft-js-plugins/draft-js-plugins/issues/800#issuecomment-315950836
    setTimeout(() => editorRef.current?.focus(), 50);
  }, [editorRef]);
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      editorRef?.current?.focus();
    },
  }));

  return <Component {...rest} ref={editorRef} onChange={handleOnChange} />;
});

export const QuillField = React.forwardRef((props: any, ref) => {
  const {
    component: Component,
    editorRef,
    handleOnChange,
    rawValue,
    ...rest
  } = props;

  console.debug(rest);

  useEffect(() => {
    // 擬似的auto focus
    // setTimeoutでdelayをかけないとpluginが効かなくなる
    // 参照：https://github.com/draft-js-plugins/draft-js-plugins/issues/800#issuecomment-315950836
    setTimeout(() => editorRef.current?.focus(), 50);
  }, [editorRef]);
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      editorRef?.current?.focus();
    },
  }));

  return (
    <Component
      {...rest}
      // className={rest.className}
      // class={rest.className}
      ref={editorRef}
      // onChange={handleOnChange}
      // defaultValue={rawValue}
    />
  );
});
