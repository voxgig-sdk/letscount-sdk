package core

type LetscountError struct {
	IsLetscountError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewLetscountError(code string, msg string, ctx *Context) *LetscountError {
	return &LetscountError{
		IsLetscountError: true,
		Sdk:              "Letscount",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *LetscountError) Error() string {
	return e.Msg
}
