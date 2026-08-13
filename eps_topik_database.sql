--
-- PostgreSQL database dump
--

\restrict zbi0rAYEJ6LeI66pvBpDBPG4caSfdzKTJ9za6OkTdjISmu3V5BppCLLbs9MoXEB

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-08-13 14:34:19

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_table_access_method = heap;

--
-- TOC entry 230 (class 1259 OID 16511)
-- Name: answers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.answers (
    id integer NOT NULL,
    attempt_id integer NOT NULL,
    question_id integer NOT NULL,
    selected_option_id integer,
    answered_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 229 (class 1259 OID 16510)
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5158 (class 0 OID 0)
-- Dependencies: 229
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- TOC entry 232 (class 1259 OID 16539)
-- Name: audio_plays; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.audio_plays (
    id integer NOT NULL,
    attempt_id integer NOT NULL,
    question_id integer NOT NULL,
    option_id integer,
    play_count integer DEFAULT 0 NOT NULL,
    CONSTRAINT valid_play_count CHECK (((play_count >= 0) AND (play_count <= 2)))
);


--
-- TOC entry 231 (class 1259 OID 16538)
-- Name: audio_plays_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.audio_plays_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5159 (class 0 OID 0)
-- Dependencies: 231
-- Name: audio_plays_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.audio_plays_id_seq OWNED BY public.audio_plays.id;


--
-- TOC entry 228 (class 1259 OID 16486)
-- Name: exam_attempts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.exam_attempts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    exam_id integer NOT NULL,
    started_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    submitted_at timestamp without time zone,
    status character varying(20) DEFAULT 'IN_PROGRESS'::character varying NOT NULL,
    CONSTRAINT valid_attempt_status CHECK (((status)::text = ANY ((ARRAY['IN_PROGRESS'::character varying, 'SUBMITTED'::character varying, 'AUTO_SUBMITTED'::character varying])::text[])))
);


--
-- TOC entry 227 (class 1259 OID 16485)
-- Name: exam_attempts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.exam_attempts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5160 (class 0 OID 0)
-- Dependencies: 227
-- Name: exam_attempts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.exam_attempts_id_seq OWNED BY public.exam_attempts.id;


--
-- TOC entry 239 (class 1259 OID 16685)
-- Name: exam_sets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.exam_sets (
    id integer NOT NULL,
    exam_id integer NOT NULL,
    set_number integer NOT NULL,
    set_name character varying(100) NOT NULL,
    created_by integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 238 (class 1259 OID 16684)
-- Name: exam_sets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.exam_sets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5161 (class 0 OID 0)
-- Dependencies: 238
-- Name: exam_sets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.exam_sets_id_seq OWNED BY public.exam_sets.id;


--
-- TOC entry 222 (class 1259 OID 16428)
-- Name: exams; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.exams (
    id integer NOT NULL,
    title character varying(150) NOT NULL,
    duration_minutes integer NOT NULL,
    total_questions integer NOT NULL,
    total_marks numeric(6,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 221 (class 1259 OID 16427)
-- Name: exams_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.exams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5162 (class 0 OID 0)
-- Dependencies: 221
-- Name: exams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.exams_id_seq OWNED BY public.exams.id;


--
-- TOC entry 236 (class 1259 OID 16596)
-- Name: images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.images (
    id integer NOT NULL,
    file_name character varying(255) NOT NULL,
    file_url text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 235 (class 1259 OID 16595)
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5163 (class 0 OID 0)
-- Dependencies: 235
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- TOC entry 226 (class 1259 OID 16465)
-- Name: options; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.options (
    id integer NOT NULL,
    question_id integer NOT NULL,
    option_label character(1) NOT NULL,
    option_text text,
    image_url text,
    audio_url text,
    is_correct boolean DEFAULT false NOT NULL,
    image_id integer
);


--
-- TOC entry 225 (class 1259 OID 16464)
-- Name: options_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.options_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5164 (class 0 OID 0)
-- Dependencies: 225
-- Name: options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.options_id_seq OWNED BY public.options.id;


--
-- TOC entry 224 (class 1259 OID 16442)
-- Name: questions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    exam_id integer NOT NULL,
    question_number integer NOT NULL,
    question_type character varying(30) NOT NULL,
    question_text text,
    image_url text,
    audio_url text,
    marks numeric(3,1) DEFAULT 2.5 NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer,
    set_id integer,
    status character varying(20) DEFAULT 'DRAFT'::character varying,
    CONSTRAINT valid_question_status CHECK (((status)::text = ANY ((ARRAY['DRAFT'::character varying, 'PUBLISHED'::character varying, 'ARCHIVED'::character varying])::text[])))
);


--
-- TOC entry 223 (class 1259 OID 16441)
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5165 (class 0 OID 0)
-- Dependencies: 223
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- TOC entry 234 (class 1259 OID 16567)
-- Name: results; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.results (
    id integer NOT NULL,
    attempt_id integer NOT NULL,
    total_questions integer NOT NULL,
    correct_answers integer DEFAULT 0 NOT NULL,
    wrong_answers integer DEFAULT 0 NOT NULL,
    unanswered integer DEFAULT 0 NOT NULL,
    score numeric(5,2) DEFAULT 0 NOT NULL,
    percentage numeric(5,2) DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 233 (class 1259 OID 16566)
-- Name: results_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.results_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5166 (class 0 OID 0)
-- Dependencies: 233
-- Name: results_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.results_id_seq OWNED BY public.results.id;


--
-- TOC entry 237 (class 1259 OID 16666)
-- Name: student_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.student_id_seq
    START WITH 1001
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 220 (class 1259 OID 16411)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    role character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    student_id integer DEFAULT nextval('public.student_id_seq'::regclass)
);


--
-- TOC entry 219 (class 1259 OID 16410)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5167 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4916 (class 2604 OID 16514)
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- TOC entry 4918 (class 2604 OID 16542)
-- Name: audio_plays id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audio_plays ALTER COLUMN id SET DEFAULT nextval('public.audio_plays_id_seq'::regclass);


--
-- TOC entry 4913 (class 2604 OID 16489)
-- Name: exam_attempts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exam_attempts ALTER COLUMN id SET DEFAULT nextval('public.exam_attempts_id_seq'::regclass);


--
-- TOC entry 4929 (class 2604 OID 16688)
-- Name: exam_sets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exam_sets ALTER COLUMN id SET DEFAULT nextval('public.exam_sets_id_seq'::regclass);


--
-- TOC entry 4905 (class 2604 OID 16431)
-- Name: exams id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exams ALTER COLUMN id SET DEFAULT nextval('public.exams_id_seq'::regclass);


--
-- TOC entry 4927 (class 2604 OID 16599)
-- Name: images id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- TOC entry 4911 (class 2604 OID 16468)
-- Name: options id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.options ALTER COLUMN id SET DEFAULT nextval('public.options_id_seq'::regclass);


--
-- TOC entry 4907 (class 2604 OID 16445)
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- TOC entry 4920 (class 2604 OID 16570)
-- Name: results id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.results ALTER COLUMN id SET DEFAULT nextval('public.results_id_seq'::regclass);


--
-- TOC entry 4902 (class 2604 OID 16414)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4953 (class 2606 OID 16520)
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- TOC entry 4957 (class 2606 OID 16550)
-- Name: audio_plays audio_plays_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audio_plays
    ADD CONSTRAINT audio_plays_pkey PRIMARY KEY (id);


--
-- TOC entry 4951 (class 2606 OID 16499)
-- Name: exam_attempts exam_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exam_attempts
    ADD CONSTRAINT exam_attempts_pkey PRIMARY KEY (id);


--
-- TOC entry 4965 (class 2606 OID 16695)
-- Name: exam_sets exam_sets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exam_sets
    ADD CONSTRAINT exam_sets_pkey PRIMARY KEY (id);


--
-- TOC entry 4941 (class 2606 OID 16439)
-- Name: exams exams_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (id);


--
-- TOC entry 4963 (class 2606 OID 16607)
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- TOC entry 4947 (class 2606 OID 16477)
-- Name: options options_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT options_pkey PRIMARY KEY (id);


--
-- TOC entry 4943 (class 2606 OID 16456)
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- TOC entry 4959 (class 2606 OID 16588)
-- Name: results results_attempt_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.results
    ADD CONSTRAINT results_attempt_id_key UNIQUE (attempt_id);


--
-- TOC entry 4961 (class 2606 OID 16586)
-- Name: results results_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.results
    ADD CONSTRAINT results_pkey PRIMARY KEY (id);


--
-- TOC entry 4955 (class 2606 OID 16522)
-- Name: answers unique_attempt_question; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT unique_attempt_question UNIQUE (attempt_id, question_id);


--
-- TOC entry 4967 (class 2606 OID 16697)
-- Name: exam_sets unique_exam_set; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exam_sets
    ADD CONSTRAINT unique_exam_set UNIQUE (exam_id, set_number);


--
-- TOC entry 4949 (class 2606 OID 16479)
-- Name: options unique_option_label; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT unique_option_label UNIQUE (question_id, option_label);


--
-- TOC entry 4945 (class 2606 OID 16458)
-- Name: questions unique_question_number; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT unique_question_number UNIQUE (exam_id, question_number);


--
-- TOC entry 4935 (class 2606 OID 16670)
-- Name: users unique_student_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_student_id UNIQUE (student_id);


--
-- TOC entry 4937 (class 2606 OID 16426)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4939 (class 2606 OID 16424)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4976 (class 2606 OID 16523)
-- Name: answers fk_answers_attempt; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT fk_answers_attempt FOREIGN KEY (attempt_id) REFERENCES public.exam_attempts(id) ON DELETE CASCADE;


--
-- TOC entry 4977 (class 2606 OID 16533)
-- Name: answers fk_answers_option; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT fk_answers_option FOREIGN KEY (selected_option_id) REFERENCES public.options(id);


--
-- TOC entry 4978 (class 2606 OID 16528)
-- Name: answers fk_answers_question; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT fk_answers_question FOREIGN KEY (question_id) REFERENCES public.questions(id);


--
-- TOC entry 4974 (class 2606 OID 16505)
-- Name: exam_attempts fk_attempt_exam; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exam_attempts
    ADD CONSTRAINT fk_attempt_exam FOREIGN KEY (exam_id) REFERENCES public.exams(id);


--
-- TOC entry 4975 (class 2606 OID 16500)
-- Name: exam_attempts fk_attempt_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exam_attempts
    ADD CONSTRAINT fk_attempt_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4979 (class 2606 OID 16551)
-- Name: audio_plays fk_audio_attempt; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audio_plays
    ADD CONSTRAINT fk_audio_attempt FOREIGN KEY (attempt_id) REFERENCES public.exam_attempts(id) ON DELETE CASCADE;


--
-- TOC entry 4980 (class 2606 OID 16561)
-- Name: audio_plays fk_audio_option; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audio_plays
    ADD CONSTRAINT fk_audio_option FOREIGN KEY (option_id) REFERENCES public.options(id) ON DELETE CASCADE;


--
-- TOC entry 4981 (class 2606 OID 16556)
-- Name: audio_plays fk_audio_question; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audio_plays
    ADD CONSTRAINT fk_audio_question FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;


--
-- TOC entry 4972 (class 2606 OID 16721)
-- Name: options fk_options_image; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT fk_options_image FOREIGN KEY (image_id) REFERENCES public.images(id) ON DELETE SET NULL;


--
-- TOC entry 4973 (class 2606 OID 16480)
-- Name: options fk_options_question; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.options
    ADD CONSTRAINT fk_options_question FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;


--
-- TOC entry 4968 (class 2606 OID 16679)
-- Name: questions fk_questions_created_by; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT fk_questions_created_by FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- TOC entry 4969 (class 2606 OID 16714)
-- Name: questions fk_questions_creator; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT fk_questions_creator FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 4970 (class 2606 OID 16459)
-- Name: questions fk_questions_exam; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT fk_questions_exam FOREIGN KEY (exam_id) REFERENCES public.exams(id);


--
-- TOC entry 4971 (class 2606 OID 16709)
-- Name: questions fk_questions_set; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT fk_questions_set FOREIGN KEY (set_id) REFERENCES public.exam_sets(id) ON DELETE CASCADE;


--
-- TOC entry 4982 (class 2606 OID 16589)
-- Name: results fk_results_attempt; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.results
    ADD CONSTRAINT fk_results_attempt FOREIGN KEY (attempt_id) REFERENCES public.exam_attempts(id) ON DELETE CASCADE;


--
-- TOC entry 4983 (class 2606 OID 16703)
-- Name: exam_sets fk_set_creator; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exam_sets
    ADD CONSTRAINT fk_set_creator FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 4984 (class 2606 OID 16698)
-- Name: exam_sets fk_set_exam; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exam_sets
    ADD CONSTRAINT fk_set_exam FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE CASCADE;


-- Completed on 2026-08-13 14:34:19

--
-- PostgreSQL database dump complete
--

\unrestrict zbi0rAYEJ6LeI66pvBpDBPG4caSfdzKTJ9za6OkTdjISmu3V5BppCLLbs9MoXEB

